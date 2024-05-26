from statsbombpy import sb
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mplsoccer import Pitch, VerticalPitch
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score, recall_score, precision_score, roc_auc_score, roc_curve, f1_score, classification_report, confusion_matrix
from tqdm import tqdm
from sklearn.metrics import confusion_matrix
from mplsoccer import FontManager
from datetime import datetime
from sklearn.pipeline import Pipeline
import json

'''
Este archivo contendría la lógica para interactuar con la librería statsbombpy, obtener los datos y procesar las predicciones.
'''
def get_prediction_data():
    tiros_statsbomb = pd.read_csv('tirosStatsBomb_modeloxG.csv')

    #Creamos un dataframe con aquellos datos que tengan shot
    booleanos = pd.Series(tiros_statsbomb.columns).str.contains('shot')
    df_test = pd.concat([pd.Series(tiros_statsbomb.columns), booleanos], axis=1)
    df_test[df_test.iloc[:,1] == True]

    #Filtro por las columnas de stasbomb
    tiros_filt = tiros_statsbomb[[
        'shot_aerial_won',
        'shot_body_part',
        'shot_first_time',
        'shot_deflected',
        'shot_one_on_one',
        'shot_open_goal',
        'shot_outcome',
        'shot_technique',
        'shot_type',
        'play_pattern',
        'x',
        'y'
    ]].reset_index(drop=True)

    #Agrego una columna al dataframe indicando si es gol o no.
    tiros_filt['goal'] = np.where(tiros_filt.shot_outcome =='Goal', 1,0)
    #Calculo de la distancia del tiro
    tiros_filt['Distance'] = np.sqrt(np.square(120 - tiros_filt['x']) + np.square(40 - tiros_filt['y']))
    #Calculo del angulo del tiro
    tiros_filt['angulo'] = np.arctan(7.32 * tiros_filt['x'] / (tiros_filt['x']**2 + tiros_filt['y']**2 - (7.32/2)**2))
    #Rellenamos las demas columnas en false para evitar error NaN
    tiros_filt.shot_aerial_won = tiros_filt.shot_aerial_won.fillna(False)
    tiros_filt.shot_first_time = tiros_filt.shot_first_time.fillna(False)
    tiros_filt.shot_one_on_one = tiros_filt.shot_one_on_one.fillna(False)
    tiros_filt.shot_open_goal = tiros_filt.shot_open_goal.fillna(False)
    tiros_filt.shot_deflected = tiros_filt.shot_deflected.fillna(False)

    # Modelo de aprendizaje supervisado, regresion logistica
    
    #Separamos el dataframe en caracteristicas x e y, goal es la etiqueta objetivo
    y = tiros_filt['goal']
    X = tiros_filt.drop(['goal', 'shot_outcome'], axis = 1)

    #Division de los datos en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, stratify= y, random_state= 13)

    #Preprocesador para tansformar las categorias (columnas) en columnas numericas
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(), ['shot_body_part', 'shot_technique', 'shot_type', 'play_pattern']),

        ],
        remainder= 'passthrough' #Mantiene las variables numéricas sin modificar
    )

    #Crear un pipe que incluye el preprocesador y un clasificador de regresion logistica
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', LogisticRegression())
    ])

    #Entreno el modelo con los datos de entrenamiento
    model.fit(X_train, y_train)
    #Predicciones sobre el conjunto de prueba
    y_pred = model.predict(X_test)


    #Generamos matriz de confusion
    preds = model.predict(X_test)
    df_cm = pd.DataFrame(confusion_matrix(y_test, preds))  # return  tn, fp, fn, tp

    VP = df_cm.iloc[1,1]
    VN = df_cm.iloc[0,0]
    FN = df_cm.iloc[1,0]
    FP = df_cm.iloc[0,1]

    #Metricas del modelo
    exactitud = accuracy = (VP + VN)/(VP + VN + FN + FP)
    precision = VP/(VP + FP)
    sensibilidad = VP/(VP + FN)
    especifidad = VN/(FP + VN)

    results = {
    'exactitud': exactitud,
    'precision': precision,
    'sensibilidad':sensibilidad,
    'especifidad':especifidad,
    'confusion_matrix':df_cm.to_dict(),
    'goles_esperados': tiros_filt.goal.value_counts(normalize=True).to_dict(),
    }

   
    #Calculo de las probabilidades de xG para todos los tiros
    probabilities = model.predict_proba(X)[:, 1]
    probabilities = pd.DataFrame(probabilities, columns=['xG'])
    X_with_prob = pd.concat([X.reset_index(drop=True), probabilities], axis=1)
    


    results['predicciones'] = X_with_prob.head().to_dict()
    results['golesReales_vs_predecidos'] = {
    'goles_hubo': int(tiros_filt.goal.sum()),
    'goles_predecido': float(X_with_prob.xG.sum())
    }
    results['goles_penalti'] = tiros_filt[tiros_filt.shot_type == 'Penalty'].goal.value_counts(normalize=True).to_dict()
    results['predicciones_penalti'] = X_with_prob[X_with_prob.shot_type == 'Penalty'].describe().to_dict()
    results['tabla_predicciones_penalti'] = X_with_prob[X_with_prob.shot_type == 'Penalty'].to_dict()

    URL_font= 'https://github.com/google/fonts/blob/main/ofl/fjallaone/FjallaOne-Regular.ttf?raw=true'
    robotto_regular = FontManager(URL_font)

    pitch = VerticalPitch(pitch_type='statsbomb', line_zorder=2, pitch_color='#22312b', line_color='#efefef', half=True)
    fig, ax = pitch.draw(figsize=(10,8))
    fig.set_facecolor('#22312b')


    pcm = pitch.scatter(X_with_prob.x, X_with_prob.y, c=X_with_prob['xG'], ax=ax, alpha=.9, cmap='hot')
    ax_cbar = fig.add_axes((1.008, 0.093, 0.03, 0.786))
    cbar = plt.colorbar(pcm, cmap='hot', cax=ax_cbar)
    cbar.ax.yaxis.set_tick_params(color='#efefef')
    plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color='#efefef')
    for label in cbar.ax.get_yticklabels():
        label.set_fontproperties(robotto_regular.prop)
        label.set_fontsize(15)



    print('Probabilidad de goles esperados', X_with_prob.sort_values(by='xG', ascending=False).head(20))
    print('Factor de correlacion',X_with_prob.corr())

     # Guardar en JSON
    with open('xG.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
   
  

    return results



#get_prediction_data()

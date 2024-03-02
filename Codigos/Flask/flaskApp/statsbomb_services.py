from statsbombpy import sb
'''
Este archivo contendría la lógica para interactuar con la librería statsbombpy, obtener los datos y procesar las predicciones.
'''
def get_prediction_data():
    # Aquí implementarías la lógica para obtener datos de statsbombpy
    # y procesar predicciones según sea necesario
    competitions = sb.competitions()
    # Por ejemplo, retornar la lista de competiciones
    print(competitions)
    return competitions





# Llama a la función si este archivo es ejecutado como script principal
get_prediction_data()
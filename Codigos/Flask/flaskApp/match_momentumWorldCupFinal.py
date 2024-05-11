import pandas as pd
from statsbombpy import sb
import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import make_interp_spline
import socceraction.xthreat as xthreat
import socceraction.spadl as spadl
import matplotlib.patches as mpatches

def matchMomentumFinal():
    world_cup = sb.matches(competition_id=43, season_id=106)
    world_cup[world_cup['competition_stage'] == 'Final']
    world_cup_final = sb.events(match_id=3869685)
    dfxT_world_cup_final = world_cup_final[world_cup_final['type'].isin(['Pass', 'Carry'])].reset_index(drop=True)[['id', 'minute', 'player', 'team', 'type','location', 'pass_end_location', 'pass_outcome','carry_end_location']]
    dfxT_world_cup_final[['x', 'y']] = dfxT_world_cup_final['location'].apply(lambda x: pd.Series(x))
    dfxT_world_cup_final[['Pass_end_x', 'Pass_end_y']] = dfxT_world_cup_final['pass_end_location'].apply(lambda x: pd.Series(x))
    dfxT_world_cup_final[['Carry_end_x', 'Carry_end_y']] = dfxT_world_cup_final['carry_end_location'].apply(lambda x: pd.Series(x))

    def xT(df, type):
        xT = pd.read_json("xTGrid.json")
        xT = np.array(xT)
        xT_rows, xT_cols = xT.shape
        if type not in ['Pass', 'Carry']:
            raise ValueError("El parámetro type solo acepta 'Pass' o 'Carry'")
        
        df_xT = df[df['type'] == f'{type}']
        df_xT = df_xT.dropna(subset=['x', 'y', f'{type}_end_x', f'{type}_end_y'])

        df_xT['x1_bin'] = pd.cut(df_xT['x'], bins=xT_cols, labels=False)
        df_xT['y1_bin'] = pd.cut(df_xT['y'], bins=xT_rows, labels=False)

        df_xT['x2_bin'] = pd.cut(df_xT[f'{type}_end_x'], bins=xT_cols, labels=False)
        df_xT['y2_bin'] = pd.cut(df_xT[f'{type}_end_y'], bins=xT_rows, labels=False)

        if type == 'Pass':
            df_xT = df_xT.loc[(df_xT['pass_outcome'].isna())]

        df_xT['x1_bin'] = df_xT['x1_bin'].astype(int)
        df_xT['y1_bin'] = df_xT['y1_bin'].astype(int)
        df_xT['x2_bin'] = df_xT['x2_bin'].astype(int)
        df_xT['y2_bin'] = df_xT['y2_bin'].astype(int)
        
        df_xT['start_zone_value'] = df_xT[['x1_bin', 'y1_bin']].apply(lambda x: xT[x[1]][x[0]], axis=1)
        df_xT['end_zone_value'] = df_xT[['x2_bin', 'y2_bin']].apply(lambda x: xT[x[1]][x[0]], axis=1)
        df_xT['xT'] = df_xT['end_zone_value'] - df_xT['start_zone_value']
        df_xT = df_xT[['player', 'team', 'minute','type', 'x', 'y', f'{type}_end_x', f'{type}_end_y', 'xT']]
        return df_xT  
    df1 = xT(dfxT_world_cup_final, type='Carry')
    df2 = xT(dfxT_world_cup_final, type='Pass')
    pd.concat([df1,df2]).groupby('player').sum()['xT'].sort_values(ascending=False)

    def concatenar_xTdfs(df):
        df_concat_xT = pd.DataFrame()
        types = ['Pass', 'Carry']
        frames = []  # Lista para almacenar los DataFrames temporales
        for i in types:
            df_xT = xT(df, type=i)
            frames.append(df_xT)  # Añade el DataFrame a la lista de frames
        df_concat_xT = pd.concat(frames)  # Concatena todos los DataFrames en la lista
        return df_concat_xT
    
    def limpiar_df(partido_entero):
        df_limpio = partido_entero[partido_entero['type'].isin(['Pass', 'Carry'])].reset_index(drop=True)[['id', 'minute', 'player', 'team', 'type','location', 'pass_end_location', 'pass_outcome','carry_end_location']]
        df_limpio[['x', 'y']] = df_limpio['location'].apply(lambda x: pd.Series(x))
        df_limpio[['Pass_end_x', 'Pass_end_y']] = df_limpio['pass_end_location'].apply(lambda x: pd.Series(x))
        df_limpio[['Carry_end_x', 'Carry_end_y']] = df_limpio['carry_end_location'].apply(lambda x: pd.Series(x))
        return df_limpio
    
    df = limpiar_df(sb.events(match_id=3869685))
    df_total = concatenar_xTdfs(df)
    xT_local = df_total[df_total['team'] == 'Argentina'].groupby('minute').sum()
    xT_visit = df_total[df_total['team'] != 'Argentina'].groupby('minute').sum()

    xT_local['rolling_xT'] = xT_local['xT'].rolling(5).mean()
    xT_visit['rolling_xT'] = xT_visit['xT'].rolling(5).mean()

    xT_tot = xT_local.merge(xT_visit, left_index=True, right_index=True, how='outer', suffixes=['_local', '_visit'])[['rolling_xT_local', 'rolling_xT_visit']].fillna(0)
    xT_tot['dif_tot'] = xT_tot['rolling_xT_local'] - xT_tot['rolling_xT_visit']
    


    fig = plt.figure(figsize=(16,9))

    color_local = 'lightblue'
    color_visitante = 'red'
    argentina_patch = mpatches.Patch(color=color_local, label='Argentina')
    francia_patch = mpatches.Patch(color=color_visitante, label='Francia')

    x = xT_tot.index
    y = xT_tot.dif_tot

    X_Y_Spline = make_interp_spline(x, y)
    X_ = np.linspace(x.min(), x.max(), 500)
    Y_ = X_Y_Spline(X_)

    plt.plot(X_, Y_)
    plt.axhline(0)

    plt.fill_between(X_, Y_, color=color_local, where= Y_ > 0)
    plt.fill_between(X_, Y_, color=color_visitante, where= Y_ < 0)

    df_goles = world_cup_final[(world_cup_final.shot_outcome == 'Goal') & (world_cup_final['minute'] < 120)]
    goles = df_goles.minute.values
    id_goles = df_goles.team.values

    for i in range(len(goles)):
        if id_goles[i] == 'Argentina':
            plt.axvline(goles[i], lw=5, color=color_local, ls=':')
        else:
            plt.axvline(goles[i], lw=1.2, color=color_visitante, ls=':')

    plt.gca().spines['top'].set_visible(False)
    plt.gca().spines['right'].set_visible(False)
    plt.gca().spines['left'].set_visible(False)

    plt.tick_params(colors='black', axis='x')

    plt.xlim(0,xT_tot.index[-1])
    plt.legend(handles=[argentina_patch, francia_patch])
    plt.title('Match momentum entre Argentina vs. Francia. Final del Mundial Qatar 2022', fontsize=24)

    fig.savefig(f'Codigos/Flask/static/matchMomentumFinal.png', bbox_inches='tight')


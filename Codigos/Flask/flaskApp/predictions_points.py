import json
import pandas as pd
from prettytable import PrettyTable
import numpy as np
import time
from statsbombpy import sb


def prediction_point():
    df = pd.read_csv('all_events_laLiga.csv')

    df_xPoints = df[df.type == 'Shot']
    match_ids = df.match_id.unique()
    # Agrupamos por equipo y match_id para luego sumar los xG de cada equipo en cada partido
    df_xGs = df_xPoints.groupby(['match_id', 'team'], as_index=False).sum()[['match_id','team','shot_statsbomb_xg']]

    #numero de simulaciones
    num_simulations = 50000

    #Creacion del dataframe que almacenara los resultados
    df_xpts = pd.DataFrame(columns=['match_id', 'team', 'xPts'])
    n=0

    #Por cada match__id unico
    for match_id in match_ids:
        #Obtenemos los nombres de los equipos para el mismo match_id. Obtenemos los xG para ambos equipos
        team1_series = df_xGs[df_xGs['match_id'] == match_id]['team']
        if len(team1_series) >= 2:
            team1 = team1_series.iloc[0]
            team2 = team1_series.iloc[1]
            #team1 = 'Local'
            #team2 = 'Visitante'

            input_home_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[0])
            input_away_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[1])

            #inicializacion de variables
            count_home_wins = 0
            count_home_loss = 0
            count_away_wins = 0
            count_away_loss = 0
            count_draws = 0
            score_mat = []
            tot_sim_time = 0
            #sim_table = PrettyTable(["N de Simulación #", input_home_team, input_away_team, "Loc Ganó", "Vis Ganó", "EMPATE", "DIF DE GOLES"])

            #Simulamos el partido actual n veces
            for i in range(num_simulations):
        
                start_time = time.time()

                #Para cada simulacion utilizamos la distribucion de Poisson para generar un numero aleatorio de goles para cada equipo basado en sus xG
                target_home_goals_scored = np.random.poisson(input_home_team_xg)
                target_away_goals_scored = np.random.poisson(input_away_team_xg)
                home_win = 0
                away_win = 0
                draw = 0
                margin = 0
            
                # En funcion de los goles generados, incrementamos dichos contadores
                if target_home_goals_scored > target_away_goals_scored:
                    count_home_wins += 1
                    count_away_loss += 1
                    home_win = 1
                    margin = target_home_goals_scored - target_away_goals_scored
            
                elif target_home_goals_scored < target_away_goals_scored:
                    count_away_wins += 1
                    count_home_loss += 1
                    away_win = 1
                    margin = target_away_goals_scored - target_home_goals_scored
                elif target_home_goals_scored == target_away_goals_scored:
                    draw = 1
                    count_draws += 1
                    margin = target_away_goals_scored - target_home_goals_scored

                #Almacenamos los goles generados
                score_mat.append((target_home_goals_scored, target_away_goals_scored))
        
                end_time = time.time()
       
                tot_sim_time += round((end_time - start_time),5)
                #sim_table.add_row([i+1, target_home_goals_scored, target_away_goals_scored, home_win, away_win, draw, margin])

            #print(sim_table)

            #Calculo de probabilidades de victoria, derrota y empate para el equipo local.
            home_win_probability = round((count_home_wins/num_simulations * 100),2)
            away_win_probability = round((count_away_wins/num_simulations * 100),2)
            draw_probability = round((count_draws/num_simulations * 100),2)

            sim_table_stats = PrettyTable(["Total # de sim", f"{team1} gana", f"{team2} gana", "Empates"])
            sim_table_stats.add_row([num_simulations, count_home_wins, count_away_wins, count_draws])
            sim_table_stats.add_row(["-", str(home_win_probability)+"%", str(away_win_probability)+"%", str(draw_probability)+"%"])
            #print(sim_table_stats)
            #print('-'*50)

            #Calculo de los puntos esperados para los equipos local y visitante
            home_xPts = (home_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (away_win_probability / 100) * 0.0
            away_xPts = (away_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (home_win_probability / 100) * 0.0
            #print(team1, "probabilidad de ganar %:", home_win_probability, "|| xPts =", round(home_xPts,2))
            #print(team2, "probabilidad de ganar %:", away_win_probability, "|| xPts =", round(away_xPts,2))
            #print("Probabilidad de empate %:", draw_probability)

            #Crecion de las listas con los match_id, nombres del equipo y puntos,
            lista = [match_id, team1, home_xPts]
            lista2 = [match_id, team2, away_xPts]

            #Agregamos las listas al dataframe
            df_xpts.loc[len(df_xpts)] = lista
            df_xpts.loc[len(df_xpts)] = lista2
            #print(df_xpts)
            #print('-'*50)
            n+=1
            print(match_id, n)

    results ={
        'LaLigaStandingP': df_xpts.groupby('team').sum().sort_values(by='xPts', ascending=False).to_dict()
    }

         # Guardar en JSON
    with open('laLiga.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
    
    return results

# prediction_point()
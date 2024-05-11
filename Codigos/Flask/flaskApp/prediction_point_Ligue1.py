import json
import pandas as pd
from prettytable import PrettyTable
import numpy as np
import time
from statsbombpy import sb

def prediction_point_Ligue1():
    df = pd.read_csv('all_events_Ligue1.csv')

    df_xPoints = df[df.type == 'Shot']
    match_ids = df.match_id.unique()
    df_xGs = df_xPoints.groupby(['match_id', 'team'], as_index=False).sum()[['match_id','team','shot_statsbomb_xg']]

    num_simulations = 50000
    df_xpts = pd.DataFrame(columns=['match_id', 'team', 'xPts'])
    n=0
    for match_id in match_ids:
        team1 = df_xGs[df_xGs['match_id'] == match_id]['team'].iloc[0]
        team2 = df_xGs[df_xGs['match_id'] == match_id]['team'].iloc[1]
        #team1 = 'Local'
        #team2 = 'Visitante'
        input_home_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[0])
        input_away_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[1])
        #print the simulation table and run simulations
        count_home_wins = 0
        count_home_loss = 0
        count_away_wins = 0
        count_away_loss = 0
        count_draws = 0
        score_mat = []
        tot_sim_time = 0
        #sim_table = PrettyTable(["N de Simulación #", input_home_team, input_away_team, "Loc Ganó", "Vis Ganó", "EMPATE", "DIF DE GOLES"])

        for i in range(num_simulations):
            #get simulation start time
            start_time = time.time()
            #run the sim - generate a random Poisson distribution
            target_home_goals_scored = np.random.poisson(input_home_team_xg)
            target_away_goals_scored = np.random.poisson(input_away_team_xg)
            home_win = 0
            away_win = 0
            draw = 0
            margin = 0
            # if more goals for home team => home team wins
            if target_home_goals_scored > target_away_goals_scored:
                count_home_wins += 1
                count_away_loss += 1
                home_win = 1
                margin = target_home_goals_scored - target_away_goals_scored
            # if more goals for away team => away team wins
            elif target_home_goals_scored < target_away_goals_scored:
                count_away_wins += 1
                count_home_loss += 1
                away_win = 1
                margin = target_away_goals_scored - target_home_goals_scored
            elif target_home_goals_scored == target_away_goals_scored:
                draw = 1
                count_draws += 1
                margin = target_away_goals_scored - target_home_goals_scored
            # add score to score matrix
            score_mat.append((target_home_goals_scored, target_away_goals_scored))
            #get end time
            end_time = time.time()
            #add the time to the total simulation time
            tot_sim_time += round((end_time - start_time),5)
            #add the info to the simulation table
            #sim_table.add_row([i+1, target_home_goals_scored, target_away_goals_scored, home_win, away_win, draw, margin])
        # calculate probabilities to win/lose/draw
        #print(sim_table)

        home_win_probability = round((count_home_wins/num_simulations * 100),2)
        away_win_probability = round((count_away_wins/num_simulations * 100),2)
        draw_probability = round((count_draws/num_simulations * 100),2)

        sim_table_stats = PrettyTable(["Total # de sim", f"{team1} gana", f"{team2} gana", "Empates"])
        sim_table_stats.add_row([num_simulations, count_home_wins, count_away_wins, count_draws])
        sim_table_stats.add_row(["-", str(home_win_probability)+"%", str(away_win_probability)+"%", str(draw_probability)+"%"])
        #print(sim_table_stats)
        #print('-'*50)

        #calculate expected Pts and print a summary
        home_xPts = (home_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (away_win_probability / 100) * 0.0
        away_xPts = (away_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (home_win_probability / 100) * 0.0
        #print(team1, "probabilidad de ganar %:", home_win_probability, "|| xPts =", round(home_xPts,2))
        #print(team2, "probabilidad de ganar %:", away_win_probability, "|| xPts =", round(away_xPts,2))
        #print("Probabilidad de empate %:", draw_probability)
        lista = [match_id, team1, home_xPts]
        lista2 = [match_id, team2, away_xPts]
        df_xpts.loc[len(df_xpts)] = lista
        df_xpts.loc[len(df_xpts)] = lista2
        #print(df_xpts)
        #print('-'*50)
        n+=1
        print(match_id, n)

    
    results ={
        'Ligue1Standing': df_xpts.groupby('team').sum().sort_values(by='xPts', ascending=False).to_dict()
    }

    with open('ligue1.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
    
    return results

#prediction_point_Ligue1()
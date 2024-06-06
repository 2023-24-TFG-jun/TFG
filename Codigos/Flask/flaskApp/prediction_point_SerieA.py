import json
import pandas as pd
from prettytable import PrettyTable
import numpy as np
import time
from statsbombpy import sb

def prediction_point_SerieA():
    df = pd.read_csv('all_events_SerieA.csv')

    df_xPoints = df[df.type == 'Shot']
    match_ids = df.match_id.unique()
    df_xGs = df_xPoints.groupby(['match_id', 'team'], as_index=False).sum()[['match_id','team','shot_statsbomb_xg']]

    num_simulations = 50000
    df_xpts = pd.DataFrame(columns=['match_id', 'team', 'xPts'])
    n=0
    for match_id in match_ids:
        team1 = df_xGs[df_xGs['match_id'] == match_id]['team'].iloc[0]
        team2 = df_xGs[df_xGs['match_id'] == match_id]['team'].iloc[1]

        input_home_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[0])
        input_away_team_xg = float(df_xGs[df_xGs['match_id'] == match_id]['shot_statsbomb_xg'].iloc[1])
        count_home_wins = 0
        count_home_loss = 0
        count_away_wins = 0
        count_away_loss = 0
        count_draws = 0
        score_mat = []
        tot_sim_time = 0

        for i in range(num_simulations):
            start_time = time.time()
            target_home_goals_scored = np.random.poisson(input_home_team_xg)
            target_away_goals_scored = np.random.poisson(input_away_team_xg)
            home_win = 0
            away_win = 0
            draw = 0
            margin = 0
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
            score_mat.append((target_home_goals_scored, target_away_goals_scored))
            end_time = time.time()
            tot_sim_time += round((end_time - start_time),5)

        home_win_probability = round((count_home_wins/num_simulations * 100),2)
        away_win_probability = round((count_away_wins/num_simulations * 100),2)
        draw_probability = round((count_draws/num_simulations * 100),2)

        sim_table_stats = PrettyTable(["Total # de sim", f"{team1} gana", f"{team2} gana", "Empates"])
        sim_table_stats.add_row([num_simulations, count_home_wins, count_away_wins, count_draws])
        sim_table_stats.add_row(["-", str(home_win_probability)+"%", str(away_win_probability)+"%", str(draw_probability)+"%"])

        home_xPts = (home_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (away_win_probability / 100) * 0.0
        away_xPts = (away_win_probability / 100) * 3.0 + (draw_probability / 100) * 1.0 + (home_win_probability / 100) * 0.0
        lista = [match_id, team1, home_xPts]
        lista2 = [match_id, team2, away_xPts]
        df_xpts.loc[len(df_xpts)] = lista
        df_xpts.loc[len(df_xpts)] = lista2
        n+=1
        print(match_id, n)

    



    results ={
        'SerieAStantding': df_xpts.groupby('team').sum().sort_values(by='xPts', ascending=False).to_dict()
    }

    with open('serieA.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
    
    return results

#prediction_point_SerieA()
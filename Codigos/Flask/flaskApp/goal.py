import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import matplotlib.ticker as ticker
import matplotlib.patheffects as path_effects
from matplotlib.patheffects import Stroke, Normal, withStroke
import matplotlib.patches as patches
from matplotlib import rcParams
from highlight_text import ax_text, fig_text
import pandas as pd
from statsbombpy import sb

from PIL import Image
import os


def goalArgentina():
    df = sb.competitions
    mundial = sb.matches(competition_id=43, season_id=106)
    partidos_arg = mundial[(mundial['home_team'] == 'Argentina') | (mundial['away_team'] == 'Argentina')]

    df_arg = pd.DataFrame()
    match_ids = list(partidos_arg.match_id.values)
    for match in match_ids:
        partido = sb.events(match_id=match)
        tiros = partido[partido['type'] == 'Shot']
        df_arg= pd.concat([df_arg, tiros])

    df_arg[['end_x', 'end_y', 'end_z']] = df_arg.shot_end_location.apply(pd.Series)
    tiros_arg = df_arg[(df_arg['team'] == 'Argentina') & (df_arg['shot_outcome'] != 'Off T') & (df_arg['end_z'].isna() == False)]

    fig, ax = plt.subplots(figsize=(16,9))

    width = 24
    height =8

    increment_x = int(width / 6)
    increment_y = int(height / 2)

    tiros_arg['goalMouthY'] = tiros_arg['end_y'] - 32
    tiros_arg['goalMouthY'] = [(x*width)/12.1 for x in tiros_arg['goalMouthY']]
    tiros_arg['goalMouthZ'] = [(x*height)/2.4 for x in tiros_arg['end_z']]
    tiros_arg[['goalMouthY', 'goalMouthZ']]


    #Arco
    ax.plot([0,0], [0, height], color = 'black', lw = 3)
    ax.plot([width, width], [0, height], color = 'black', lw = 3)

    ax.plot([0, width], [height, height], color = 'black', lw = 3)

    #Logica para zonas
    bins_y = range(0, width + 1, increment_x)
    bins_z = range(0, height + 1, increment_y)
    tiros_arg['bins_y'] = pd.cut(tiros_arg['goalMouthY'], bins_y)
    tiros_arg['bins_z'] = pd.cut(tiros_arg['goalMouthZ'], bins_z)
    tiros_arg['shot_aux'] = 1

    data_bins = tiros_arg[['team', 'bins_y', 'bins_z', 'shot_aux']].groupby(['bins_y', 'bins_z', 'team'])['shot_aux'].sum().reset_index()
    total_shots = tiros_arg.groupby(['team'])['shot_aux'].sum().reset_index()
    total_shots.columns = ['team', 'total']
    data_bins = pd.merge(data_bins, total_shots, how= 'left', on= 'team')
    data_bins['shot_pct'] = data_bins['shot_aux']/data_bins['total']
    data_bins = data_bins.sort_values(by = ['bins_y', 'bins_z'])
    ax.axis('equal')


    data = list(data_bins['shot_pct'])
    max_data = max(data)
    scaled_data = [x/max_data for x in data]

    i = 0 
    x = 0
    while x < width:
        for y in range(0, height, increment_y):
            rect = patches.Rectangle(
                    (x, y),  # bottom left starting position (x,y)
                    increment_x,  # width
                    increment_y,  # height
                    ec='#ab2a3e',
                    fc='#ab2a3e',
                    alpha = scaled_data[i], # <---- the transparency
                    zorder=-1
                    )
        
            ax.add_patch(rect)
        
            # -- Anotate the counter (i) and choose color depending on value
            if scaled_data[i] < .5:
                color_text = 'black'
                fore_color ='white'
            else:
                color_text = 'white'
                fore_color = 'black'
            label_ = ax.text(
                        x = x + increment_x/2, y = y + increment_y/2,
                        s = f'{data[i]:.1%}', # <----- the data label
                        color = color_text,
                        va = 'center',
                        ha = 'center',
                        size = 13.5
                    )
            # Set path effects to ensure readability
            label_.set_path_effects([Stroke(linewidth=1.7, foreground=fore_color), Normal()])
        
            i += 1
        
        # -- Once we've placed the top & bottom rectangles we move right.
        x = x + increment_x

    ax.set_xlim(-2,width + 2)
    ax.set_ylim(-2,height + 3)
    ax.set_axis_off()
    ax.plot([-2,width + 2],[0,0], color = 'black', marker = 'None', lw = 3, zorder = 3)

    ax.scatter(tiros_arg['goalMouthY'], tiros_arg['goalMouthZ'], color = "#ab2a3e", alpha = 0.4, ec='black')
    goles_tiros_arg = tiros_arg[tiros_arg['shot_outcome'] == 'Goal']
    ax.scatter(goles_tiros_arg['goalMouthY'], goles_tiros_arg['goalMouthZ'], ec = "black", color = "#ab2a3e", alpha = 0.99, lw=1.15, s=400)
    #plt.savefig('arco.png', dpi=300, bbox_inches='tight')

    fig.savefig(f'Codigos/Flask/static/goalArgentina.png', bbox_inches='tight')

goalArgentina()
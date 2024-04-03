import pandas as pd
from mplsoccer import VerticalPitch, Pitch
from statsbombpy import sb
import matplotlib.pyplot as plt



def mapasCalorSpainRodri():
    partido =sb.events(match_id=3869220)
    df_rodri = partido[partido['player'] == 'Rodrigo Hernández Cascante']
    df_rodri[['x', 'y']] = df_rodri.location.apply(pd.Series)
    df_rodri[['x', 'y', 'location']]

    fig, ax = plt.subplots(figsize=(16,9))
    pitch = Pitch(pitch_type='statsbomb', line_color='white', pitch_color='black')

    pitch.draw(ax=ax)
    pitch.kdeplot(
        df_rodri['x'],
        df_rodri['y'],
        ax=ax,
        levels=100,
        shade=True,
        zorder=-1,
        shade_lowest=True,
        cmap = 'hot'
    )

    fig.savefig(f'../Flask/static/mapaCalorRodri.png', bbox_inches='tight')


    df_Olmo = partido[partido['player'] == 'Daniel Olmo Carvajal']
    # Desde donde comenzo sus acciones
    df_Olmo[['x', 'y']] = df_Olmo.location.apply(pd.Series)
    df_Olmo[['x', 'y', 'location']]

    fig, ax = plt.subplots(figsize=(16,9))
    pitch = Pitch(pitch_type='statsbomb', line_color='white', pitch_color='black')

    pitch.draw(ax=ax)
    pitch.kdeplot(
        df_Olmo['x'],
        df_Olmo['y'],
        ax=ax,
        levels=100,
        shade=True,
        zorder=-1,
        shade_lowest=True,
        cmap = 'hot'
    )

    fig.savefig(f'../Flask/static/mapaCalorOlmo.png', bbox_inches='tight')


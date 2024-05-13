export interface XG {
    exactitud:                  number;
    precision:                  number;
    sensibilidad:               number;
    especifidad:                number;
    confusion_matrix:           { [key: string]: { [key: string]: number } };
    goles_esperados:            { [key: string]: number };
    predicciones:               Predicciones;
    golesReales_vs_predecidos:  GolesRealesVsPredecidos;
    goles_penalti:              { [key: string]: number };
    predicciones_penalti:       PrediccionesPenalti;
    tabla_predicciones_penalti: TablaPrediccionesPenalti;
}

export interface GolesRealesVsPredecidos {
    goles_hubo:      number;
    goles_predecido: number;
}

export interface Predicciones {
    shot_aerial_won: { [key: string]: boolean };
    shot_body_part:  { [key: string]: string };
    shot_first_time: { [key: string]: boolean };
    shot_deflected:  { [key: string]: boolean };
    shot_one_on_one: { [key: string]: boolean };
    shot_open_goal:  { [key: string]: boolean };
    shot_technique:  { [key: string]: string };
    shot_type:       { [key: string]: string };
    play_pattern:    { [key: string]: string };
    x:               { [key: string]: number };
    y:               { [key: string]: number };
    Distance:        { [key: string]: number };
    angulo:          { [key: string]: number };
    xG:              { [key: string]: number };
}

export interface PrediccionesPenalti {
    x:        { [key: string]: number };
    y:        { [key: string]: number };
    Distance: { [key: string]: number };
    angulo:   { [key: string]: number };
    xG:       { [key: string]: number };
}

export interface TablaPrediccionesPenalti {
    shot_aerial_won: { [key: string]: boolean };
    shot_body_part:  { [key: string]: PlayPattern };
    shot_first_time: { [key: string]: boolean };
    shot_deflected:  { [key: string]: boolean };
    shot_one_on_one: { [key: string]: boolean };
    shot_open_goal:  { [key: string]: boolean };
    shot_technique:  { [key: string]: PlayPattern };
    shot_type:       { [key: string]: PlayPattern };
    play_pattern:    { [key: string]: PlayPattern };
    x:               { [key: string]: number };
    y:               { [key: string]: number };
    Distance:        { [key: string]: number };
    angulo:          { [key: string]: number };
    xG:              { [key: string]: number };
}

export enum PlayPattern {
    LeftFoot = "Left Foot",
    Normal = "Normal",
    Other = "Other",
    Penalty = "Penalty",
    RightFoot = "Right Foot",
}

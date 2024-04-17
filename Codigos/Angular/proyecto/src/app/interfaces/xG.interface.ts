export interface XG {
    GolesEsperados: GolesEsperados;
}

export interface GolesEsperados {
    confusion_matrix:           { [key: string]: { [key: string]: number } };
    especifidad:                number;
    exactitud:                  number;
    golesReales_vs_predecidos:  GolesRealesVsPredecidos;
    goles_esperados:            { [key: string]: number };
    goles_penalti:              { [key: string]: number };
    precision:                  number;
    predicciones:               Predicciones;
    predicciones_penalti:       PrediccionesPenalti;
    sensibilidad:               number;
    tabla_predicciones_penalti: TablaPrediccionesPenalti;
}

export interface GolesRealesVsPredecidos {
    goles_hubo:      number;
    goles_predecido: number;
}

export interface Predicciones {
    Distance:        { [key: string]: number };
    angulo:          { [key: string]: number };
    play_pattern:    { [key: string]: string };
    shot_aerial_won: { [key: string]: boolean };
    shot_body_part:  { [key: string]: string };
    shot_deflected:  { [key: string]: boolean };
    shot_first_time: { [key: string]: boolean };
    shot_one_on_one: { [key: string]: boolean };
    shot_open_goal:  { [key: string]: boolean };
    shot_technique:  { [key: string]: string };
    shot_type:       { [key: string]: string };
    x:               { [key: string]: number };
    xG:              { [key: string]: number };
    y:               { [key: string]: number };
}

export interface PrediccionesPenalti {
    Distance: { [key: string]: number };
    angulo:   { [key: string]: number };
    x:        { [key: string]: number };
    xG:       { [key: string]: number };
    y:        { [key: string]: number };
}

export interface TablaPrediccionesPenalti {
    Distance:        { [key: string]: number };
    angulo:          { [key: string]: number };
    play_pattern:    { [key: string]: PlayPattern };
    shot_aerial_won: { [key: string]: boolean };
    shot_body_part:  { [key: string]: PlayPattern };
    shot_deflected:  { [key: string]: boolean };
    shot_first_time: { [key: string]: boolean };
    shot_one_on_one: { [key: string]: boolean };
    shot_open_goal:  { [key: string]: boolean };
    shot_technique:  { [key: string]: PlayPattern };
    shot_type:       { [key: string]: PlayPattern };
    x:               { [key: string]: number };
    xG:              { [key: string]: number };
    y:               { [key: string]: number };
}

export enum PlayPattern {
    LeftFoot = "Left Foot",
    Normal = "Normal",
    Other = "Other",
    Penalty = "Penalty",
    RightFoot = "Right Foot",
}

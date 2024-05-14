
export interface Laliga {
    LaLigaStandingP: LaLigaStandingP;
}
export interface Premier {
    PremierStandingP: PremierStandingP;
}
export interface SerieA {
    SerieAStantding: SerieAStantding;
}
export interface Bundesliga {
    BundesligaStanding: BundesligaStanding;
}
export interface Ligue1 {
    Ligue1Standing: Ligue1Standing;
}

export interface LaLigaStandingP {
    match_id: { [key: string]: number };
    xPts:     { [key: string]: number };
}
export interface PremierStandingP {
    match_id: { [key: string]: number };
    xPts:     { [key: string]: number };
}
export interface SerieAStantding {
    match_id: { [key: string]: number };
    xPts:     { [key: string]: number };
}
export interface BundesligaStanding {
    match_id: { [key: string]: number };
    xPts:     { [key: string]: number };
}
export interface Ligue1Standing {
    match_id: { [key: string]: number };
    xPts:     { [key: string]: number };
}

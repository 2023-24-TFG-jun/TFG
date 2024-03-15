export interface Equipos {
    get:        string;
    parameters: Parameters;
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   Response;
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    league: string;
    season: string;
    team:   string;
}

export interface Response {
    league:          League;
    team:            Team;
    form:            string;
    fixtures:        Fixtures;
    goals:           ResponseGoals;
    biggest:         Biggest;
    clean_sheet:     CleanSheet;
    failed_to_score: CleanSheet;
    penalty:         Penalty;
    lineups:         Lineup[];
    cards:           Cards;
}

export interface Biggest {
    streak: Streak;
    wins:   Loses;
    loses:  Loses;
    goals:  BiggestGoals;
}

export interface BiggestGoals {
    for:     PurpleAgainst;
    against: PurpleAgainst;
}

export interface PurpleAgainst {
    home: number;
    away: number;
}

export interface Loses {
    home: string;
    away: null | string;
}

export interface Streak {
    wins:  number;
    draws: number;
    loses: number;
}

export interface Cards {
    yellow: { [key: string]: Missed };
    red:    { [key: string]: Missed };
}

export interface Missed {
    total:      number | null;
    percentage: null | string;
}

export interface CleanSheet {
    home:  number;
    away:  number;
    total: number;
}

export interface Fixtures {
    played: CleanSheet;
    wins:   CleanSheet;
    draws:  CleanSheet;
    loses:  CleanSheet;
}

export interface ResponseGoals {
    for:     FluffyAgainst;
    against: FluffyAgainst;
}

export interface FluffyAgainst {
    total:   CleanSheet;
    average: Average;
    minute:  { [key: string]: Missed };
}

export interface Average {
    home:  string;
    away:  string;
    total: string;
}

export interface League {
    id:      number;
    name:    string;
    country: string;
    logo:    string;
    flag:    string;
    season:  number;
}

export interface Lineup {
    formation: string;
    played:    number;
}

export interface Penalty {
    scored: Missed;
    missed: Missed;
    total:  number;
}

export interface Team {
    id:   number;
    name: string;
    logo: string;
}

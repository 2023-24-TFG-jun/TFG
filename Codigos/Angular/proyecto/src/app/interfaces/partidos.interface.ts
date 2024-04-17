export interface Partidos {
    get:        string;
    parameters: Parameters;
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   Response[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    league: string;
    season: string;
    date:   Date;
    team:   string;
}

export interface Response {
    fixture: Fixture;
    league:  League;
    teams:   Goals;
    goals:   Goals;
    score:   Score;
}

export interface Fixture {
    id:        number;
    referee:   string;
    timezone:  string;
    date:      Date;
    timestamp: number;
    periods:   Periods;
    venue:     Venue;
    status:    Status;
}

export interface Periods {
    first:  null;
    second: null;
}

export interface Status {
    long:    string;
    short:   string;
    elapsed: null;
}

export interface Venue {
    id:   number;
    name: string;
    city: string;
}

export interface Goals {
    home: Away | null;
    away: Away | null;
}

export interface Away {
    id:     number;
    name:   string;
    logo:   string;
    winner: null;
}

export interface League {
    id:      number;
    name:    string;
    country: string;
    logo:    string;
    flag:    null;
    season:  number;
    round:   string;
}

export interface Score {
    halftime:  Goals;
    fulltime:  Goals;
    extratime: Goals;
    penalty:   Goals;
}
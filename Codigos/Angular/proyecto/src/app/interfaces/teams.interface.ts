export interface Equipos {
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
    name: string;
}

export interface Response {
    team:  Team;
    venue: Venue;
}

export interface Team {
    id:       number;
    name:     string;
    code:     string;
    country:  string;
    founded:  number;
    national: boolean;
    logo:     string;
}

export interface Venue {
    id:       number;
    name:     string;
    address:  string;
    city:     string;
    capacity: number;
    surface:  string;
    image:    string;
}

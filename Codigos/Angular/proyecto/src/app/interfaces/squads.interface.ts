export interface Squads {
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
    team: string;
}

export interface Response {
    team:    Team;
    players: Player[];
}

export interface Player {
    id:       number;
    name:     string;
    age:      number;
    number:   number;
    position: Position;
    photo:    string;
}

export enum Position {
    Attacker = "Attacker",
    Defender = "Defender",
    Goalkeeper = "Goalkeeper",
    Midfielder = "Midfielder",
}

export interface Team {
    id:   number;
    name: string;
    logo: string;
}

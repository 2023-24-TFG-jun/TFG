import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipos } from '../interfaces/teamsStatistics.interface';
import { Equipo, Team, Responses } from '../interfaces/teams.interface';
import { League, Response } from '../interfaces/ligas.interfaces';
import { Squads } from '../interfaces/squads.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public servicioUrl: string = 'https://api-football-v1.p.rapidapi.com/v3/teams';

  constructor(private http: HttpClient) { }


  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '44ea783a43mshba334dd0e32e61bp1a1ab3jsnf17b021a0728',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  });

  // Obtener el id del equipo
  buscarEquipoPorNombre(nombreEquipo: string): Observable<Responses | undefined> {
    if (!nombreEquipo.trim()) {
      return of(undefined);
    }
    return this.http.get<{ response: Responses[] }>(`${this.servicioUrl}?name=${nombreEquipo}`, { headers: this.headers }).pipe(
      map(response => {
        console.log('Respuesta del servidor:', response);
        const respuesta = response.response[0];
        if(respuesta && respuesta.team.name.toLowerCase() === nombreEquipo.toLowerCase()){
          return {
            team: respuesta.team,
            venue: respuesta.venue
          };
        } else {
          return undefined;
        }
      }),
    
      catchError(error => {
        console.error('Error en buscarEquipoPorNombre:', error);
        return of(undefined);
      })
    );
  }

  // Obtener el id de la liga
  obtenerIDLiga(idEquipo: number): Observable<number | undefined> {
    return this.http.get<{ response: Response[] }>(`https://api-football-v1.p.rapidapi.com/v3/leagues?team=${idEquipo}`, { headers: this.headers }).pipe(
      map(response => {
        console.log('Servicio obtenerIDLIga antes', response);
        if (response.response.length > 0 && response.response[0].league) {
          console.log('despues', response.response[0].league.id);
          return response.response[0].league.id;
        } else {
          return undefined;
        }
      }),
      catchError(error => {
        console.error('Error en obtenerIDLiga:', error);
        return of(undefined);
      })
    );
  }


  // Con el id del equipo y el id de la liga, llamar a statistics
  obtenerDatos(idLiga: number, season: number, idTeam: number): Observable<Equipos> {
    return this.http.get<Equipos>(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${idLiga}&season=${season}&team=${idTeam}`, { headers: this.headers });
  }

  // Siguientes partidos
  nextFixtures(idTeam: number): Observable<Equipos> {
    return this.http.get<Equipos>(`https://api-football-v1.p.rapidapi.com/v3/fixtures?next=4&team=${idTeam}`, { headers: this.headers });
  }

  // Ultimos partidos
  lastFixtures(idTeam: number): Observable<Equipos> {
    return this.http.get<Equipos>(`https://api-football-v1.p.rapidapi.com/v3/fixtures?last=4&team=${idTeam}`, { headers: this.headers });
  }

  // Integrantes del equipo
  squad(idTeam: number): Observable<Squads> {
    return this.http.get<Squads>(`https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${idTeam}`, { headers: this.headers });
  }


  buscarSugerenciasEquipo(idLiga: number, season: number): Observable<Team[]> {
    if (!idLiga || !season){
      return of([]);
    }

    return this.http.get<Equipo>(`${this.servicioUrl}?league=${idLiga}&season=${season}`, { headers: this.headers })
      .pipe(       
        map(response => response.response.map(r => r.team)),
        map(teams => teams.splice(0,5)), 
        catchError(error => {
        console.error('Error en buscarSugerenciasLiga:', error);
        return of([]);
      })
    );
  }
  
}

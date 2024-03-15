import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipos } from '../interfaces/teamsStatistics.interface';
import { Team } from '../interfaces/teams.interface';
import { League } from '../interfaces/competiciones.interface';

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
  buscarEquipoPorNombre(nombreEquipo: string): Observable<Team | undefined> {
    if (!nombreEquipo.trim()) {
      return of(undefined);
    }
  
    return this.http.get<{ response: Team[] }>(`${this.servicioUrl}`, { headers: this.headers }).pipe(
      map(response => {
        const equipo = response.response.find(e => e.name.toLowerCase() === nombreEquipo.toLowerCase());
        return equipo ? equipo : undefined;
      }),
      catchError(error => {
        console.error('Error en buscarEquipoPorNombre:', error);
        return of(undefined);
      })
    );
  }

  // Obtener el id de la liga
  obtenerIDLiga(idEquipo: number): Observable<number | undefined> {
    return this.http.get<{ response: League[] }>(`https://api-football-v1.p.rapidapi.com/v3/leagues?team=${idEquipo}`, { headers: this.headers }).pipe(
      map(response => {
        // Suponiendo que la respuesta incluye un array de ligas y queremos el ID de la primera
        return response.response.length > 0 ? response.response[0].id : undefined;
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


  // buscarSugerenciasEquipo(nombreLiga: string): Observable<Ligas['response'][number]['league'][]>{
  //   if (!nombreLiga.trim()){
  //     return of([]);
  //   }

  //   return this.http.get<Ligas>(`${this.servicioUrl}`, { headers: this.headers })
  //     .pipe(       
  //       map(response => response.response.map(l => l.league)),
  //       map(leagues => leagues.filter(league => league.name.toLowerCase().includes(nombreLiga.toLowerCase())).splice(0,5)), 
  //       catchError(error => {
  //       console.error('Error en buscarSugerenciasLiga:', error);
  //       return of([]);
  //     })
  //   );
  // }




















}

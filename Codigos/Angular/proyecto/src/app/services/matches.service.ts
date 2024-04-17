import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partidos } from '../interfaces/partidos.interface';
import { Observable, of } from 'rxjs';
import { Responses } from '../interfaces/teams.interface';
import { catchError, map } from 'rxjs/operators';
import { Ligas } from '../interfaces/ligas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  public servicioUrl: string = 'https://api-football-v1.p.rapidapi.com/v3';

  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '44ea783a43mshba334dd0e32e61bp1a1ab3jsnf17b021a0728',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  });


  // Obtener el id del equipo buscando por nombre
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

  // Buscar el id de la liga por el nombre
  buscarLigaPorNombre(nombreLiga: string): Observable<number | undefined> {
    if (!nombreLiga.trim()) {
      return of(undefined);
    }
  
    return this.http.get<Ligas>(`${this.servicioUrl}`, { headers: this.headers }).pipe(
      map(response => {
        const liga = response.response.find(l => l.league.name.toLowerCase() === nombreLiga.toLowerCase());
        return liga ? liga.league.id : undefined;
      }),
      catchError(error => {
        console.error('Error en buscarLigaPorNombre:', error);
        return of(undefined);
      })
    );
  }

  /*Con el id de la liga, el id del equipo, la season y la fecha llamamos al endpoint final*/ 

  obtenerPartidos(idLiga: number, season: number, idTeam: number, fecha: Date): Observable<Partidos> {
    return this.http.get<Partidos>(`${this.servicioUrl}/fixtures?league=${idLiga}&season=${season}&team=${idTeam}&date=${fecha}`, { headers: this.headers });
  }
}

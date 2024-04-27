import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partidos } from '../interfaces/partidos.interface';
import { Observable, of } from 'rxjs';
import { Responses } from '../interfaces/teams.interface';
import { catchError, map } from 'rxjs/operators';
import { Ligas } from '../interfaces/ligas.interfaces';
import * as moment from 'moment';

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
    return this.http.get<{ response: Responses[] }>(`${this.servicioUrl}/teams?name=${nombreEquipo}`, { headers: this.headers }).pipe(
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
  
    return this.http.get<Ligas>(`${this.servicioUrl}/leagues`, { headers: this.headers }).pipe(
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

  obtenerPartidos( season: number, fecha?: Date, idLiga?: number, idTeam?: number): Observable<Partidos> {
    let params = new HttpParams()
      .set('season', season.toString());

    if(idLiga){
      params = params.set('league', idLiga.toString());
    }
    if(idTeam){
      params = params.set('team', idTeam.toString());
    }
    if(fecha){
      const formattedDate = moment(fecha).format('YYYY-MM-DD');
      params = params.set('date', formattedDate);
    }

    return this.http.get<Partidos>(`${this.servicioUrl}/fixtures`, { headers: this.headers, params: params });
  }

  buscarSugerenciasLiga(nombreLiga: string): Observable<Ligas['response'][number]['league'][]>{
    if (!nombreLiga.trim()){
      return of([]);
    }

    return this.http.get<Ligas>(`${this.servicioUrl}/leagues`, { headers: this.headers })
      .pipe(       
        map(response => response.response.map(l => l.league)),
        map(leagues => leagues.filter(league => league.name.toLowerCase().includes(nombreLiga.toLowerCase())).splice(0,5)), 
        catchError(error => {
        console.error('Error en buscarSugerenciasLiga:', error);
        return of([]);
      })
    );
  }
}

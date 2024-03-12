import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { Competiciones, League } from '../interfaces/competiciones.interface';
import { catchError, map } from 'rxjs/operators';
import { Ligas } from '../interfaces/ligas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  public apiKey     : string = '44ea783a43mshba334dd0e32e61bp1a1ab3jsnf17b021a0728';
  public servicioUrl: string = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
  public apiHost: string = 'api-football-v1.p.rapidapi.com';




  constructor(private http: HttpClient) { }

  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '44ea783a43mshba334dd0e32e61bp1a1ab3jsnf17b021a0728',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  });


buscarLigaPorNombre(nombreLiga: string): Observable<number | undefined> {
  if (!nombreLiga.trim()) {
    return of(undefined);
  }

  // Asegúrate de que la URL apunte al endpoint correcto para buscar ligas por nombre
  return this.http.get<Ligas>(`${this.servicioUrl}`, { headers: this.headers }).pipe(
    map(response => {
      // Encuentra la liga por nombre, considerando que la propiedad 'league' está dentro del objeto 'response'
      const liga = response.response.find(l => l.league.name.toLowerCase() === nombreLiga.toLowerCase());
      return liga ? liga.league.id : undefined;
    }),
    catchError(error => {
      console.error('Error en buscarLigaPorNombre:', error);
      return of(undefined);
    })
  );
}



  obtenerClasificacion(ligaId: number,season: number ):  Observable<Competiciones>  {
  
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${ligaId}&season=${season}`, { headers: this.headers });
  }

  getAniosDisponibles(): Observable<number[]> {
    return this.http.get<any>(`https://api-football-v1.p.rapidapi.com/v3/leagues/seasons`, { headers: this.headers })
    .pipe(
      map(data => data.response as number[])
      );
  }

  buscarSugerenciasLiga(nombreLiga: string): Observable<Ligas['response'][number]['league'][]>{
    if (!nombreLiga.trim()){
      return of([]);
    }

    return this.http.get<Ligas>(`${this.servicioUrl}`, { headers: this.headers })
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

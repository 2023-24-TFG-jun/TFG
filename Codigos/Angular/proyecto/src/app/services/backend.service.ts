import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrediccionesLigas } from '../interfaces/prediccionesLigas.interface';
import { Competiciones } from '../interfaces/competiciones.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public headers = new HttpHeaders({
    'X-RapidAPI-Key': '44ea783a43mshba334dd0e32e61bp1a1ab3jsnf17b021a0728',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  });

  getLaLiga(): Observable<PrediccionesLigas>{
    return this.http.get<PrediccionesLigas>('http://127.0.0.1:5000/prediction_points/laLiga');
  }

  getRealLaLiga(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=140&season=2015`, { headers: this.headers });
  } 

  getLigue1(): Observable<PrediccionesLigas>{
    return this.http.get<PrediccionesLigas>('http://127.0.0.1:5000/prediction_points/Ligue1');
  }

  getRealLigue1(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=61&season=2015`, { headers: this.headers });
  } 

  getBundesliga(): Observable<PrediccionesLigas>{
    return this.http.get<PrediccionesLigas>('http://127.0.0.1:5000/prediction_points/Bundesliga');
  }

  getRealBundesliga(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=78&season=2015`, { headers: this.headers });
  } 

  getPremier(): Observable<PrediccionesLigas>{
    return this.http.get<PrediccionesLigas>('http://127.0.0.1:5000/prediction_points/premier');
  }

  getRealPremier(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=39&season=2015`, { headers: this.headers });
  } 

  getSerieA(): Observable<PrediccionesLigas>{
    return this.http.get<PrediccionesLigas>('http://127.0.0.1:5000/prediction_points/serieA');
  }

  getRealSerieA(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=135&season=2015`, { headers: this.headers });
  } 
}

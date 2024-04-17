import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrediccionesLigas } from '../interfaces/prediccionesLigas.interface';
import { Competiciones } from '../interfaces/competiciones.interface';
import { XG } from '../interfaces/xG.interface';

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

  golesEsperados(): Observable<XG>{
    return this.http.get<XG>('http://127.0.0.1:5000/get_prediction_data');
  } 

  golesEsperadosImg(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/golesEsperados.png', { responseType: 'blob' });
  } 

  matchMomentumFinal(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/matchMomentumFinal.png', { responseType: 'blob' })
  }

  goalArgentina(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/goalArgentina.png', { responseType: 'blob' })
  }

  messiMap(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/mapMessi.png', { responseType: 'blob' })
  }

  mbappeMap(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/mapMbappe.png', { responseType: 'blob' })
  }

  messiLocationMap(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/locationMapMessi.png', { responseType: 'blob' })
  }

  messiPassMap(): Observable<Blob>{
    return this.http.get('http://127.0.0.1:5000/static/pasesMessi.png', { responseType: 'blob' })
  }


}

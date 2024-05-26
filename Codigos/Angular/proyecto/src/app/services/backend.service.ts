import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bundesliga, Laliga, Ligue1, Premier, SerieA } from '../interfaces/prediccionesLigas.interface';
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

  getLaLiga(): Observable<Laliga>{
    //return this.http.get<Laliga>('http://127.0.0.1:5000/prediction_points/laLiga');
    return this.http.get<Laliga>('https://tfg-pj2s.onrender.com/prediction_points/laLiga');
  }

  getRealLaLiga(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=140&season=2015`, { headers: this.headers });
  } 

  getLigue1(): Observable<Ligue1>{
    //return this.http.get<Ligue1>('http://127.0.0.1:5000/prediction_points/Ligue1');
    return this.http.get<Ligue1>('https://tfg-pj2s.onrender.com/prediction_points/Ligue1');
  }

  getRealLigue1(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=61&season=2015`, { headers: this.headers });
  } 

  getBundesliga(): Observable<Bundesliga>{
    // return this.http.get<Bundesliga>('http://127.0.0.1:5000/prediction_points/Bundesliga');
    return this.http.get<Bundesliga>('https://tfg-pj2s.onrender.com/prediction_points/Bundesliga');
  }

  getRealBundesliga(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=78&season=2015`, { headers: this.headers });
  } 

  getPremier(): Observable<Premier>{
    //return this.http.get<Premier>('http://127.0.0.1:5000/prediction_points/premier');
    return this.http.get<Premier>('https://tfg-pj2s.onrender.com/prediction_points/premier');
  }

  getRealPremier(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=39&season=2015`, { headers: this.headers });
  } 

  getSerieA(): Observable<SerieA>{
    // return this.http.get<SerieA>('http://127.0.0.1:5000/prediction_points/serieA');
    return this.http.get<SerieA>('https://tfg-pj2s.onrender.com/prediction_points/serieA');
  }

  getRealSerieA(): Observable<Competiciones>{
    return this.http.get<Competiciones>(`https://api-football-v1.p.rapidapi.com/v3/standings?league=135&season=2015`, { headers: this.headers });
  } 

  golesEsperados(): Observable<XG>{
   // return this.http.get<XG>('http://127.0.0.1:5000/get_prediction_data');
    return this.http.get<XG>('https://tfg-pj2s.onrender.com/get_prediction_data');
  } 

  golesEsperadosImg(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/golesEsperados.png', { responseType: 'blob' });
    return this.http.get('https://tfg-pj2s.onrender.com/static/golesEsperados.png', { responseType: 'blob' });
  } 

  matchMomentumFinal(): Observable<Blob>{
   //return this.http.get('http://127.0.0.1:5000/static/matchMomentumFinal.png', { responseType: 'blob' })
   return this.http.get('https://tfg-pj2s.onrender.com/static/matchMomentumFinal.png', { responseType: 'blob' })
  }

  goalArgentina(): Observable<Blob>{
  // return this.http.get('http://127.0.0.1:5000/static/goalArgentina.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/goalArgentina.png', { responseType: 'blob' })
  }

  messiMap(): Observable<Blob>{
   //return this.http.get('http://127.0.0.1:5000/static/mapMessi.png', { responseType: 'blob' })
   return this.http.get('https://tfg-pj2s.onrender.com/static/mapMessi.png', { responseType: 'blob' })
  }

  mbappeMap(): Observable<Blob>{
   //return this.http.get('http://127.0.0.1:5000/static/mapMbappe.png', { responseType: 'blob' })
   return this.http.get('https://tfg-pj2s.onrender.com/static/mapMbappe.png', { responseType: 'blob' })
  }

  messiLocationMap(): Observable<Blob>{
   //return this.http.get('http://127.0.0.1:5000/static/locationMapMessi.png', { responseType: 'blob' })
   return this.http.get('https://tfg-pj2s.onrender.com/static/locationMapMessi.png', { responseType: 'blob' })
  }

  messiPassMap(): Observable<Blob>{
   //return this.http.get('http://127.0.0.1:5000/static/pasesMessi.png', { responseType: 'blob' })
   return this.http.get('https://tfg-pj2s.onrender.com/static/pasesMessi.png', { responseType: 'blob' })
  }

  enzoMap(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/enzoMap.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/enzoMap.png', { responseType: 'blob' })
   }

   koundeMap(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/koundeMap.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/koundeMap.png', { responseType: 'blob' })
   }

   rodrigoDePaulMap(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/RodrigodepaulMap.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/RodrigodepaulMap.png', { responseType: 'blob' })
   }

   tchouameniMap(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/tchouameniMap.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/tchouameniMap.png', { responseType: 'blob' })
   }

   goalFrance(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/goalFrance.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/goalFrance.png', { responseType: 'blob' })
   }

   locationEnzo(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/locationEnzo.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/locationEnzo.png', { responseType: 'blob' })
   }

   locationKounde(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/locationKounde.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/locationKounde.png', { responseType: 'blob' })
   }

   locationMbappe(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/locationMbappe.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/locationMbappe.png', { responseType: 'blob' })
   }

   locationRodrigoDePaul(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/locationRodrigoDePaul.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/locationRodrigoDePaul.png', { responseType: 'blob' })
   }

   locationTchouameni(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/locationTchouameni.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/locationTchouameni.png', { responseType: 'blob' })
   }

   pasesEnzo(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/pasesEnzo.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/pasesEnzo.png', { responseType: 'blob' })
   }

   pasesKounde(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/pasesKounde.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/pasesKounde.png', { responseType: 'blob' })
   }

   pasesMbappe(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/pasesMbappe.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/pasesMbappe.png', { responseType: 'blob' })
   }

   Ligue1(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/Ligue1.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/Ligue1.png', { responseType: 'blob' })
   }

   progresoBundesliga(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/progresoBundesliga.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/progresoBundesliga.png', { responseType: 'blob' })
   }

   progresoLaLiga(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/progresoLaLiga.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/progresoLaLiga.png', { responseType: 'blob' })
   }

   progresoPremier(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/progresoPremier.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/progresoPremier.png', { responseType: 'blob' })
   }

   progresoSerieA(): Observable<Blob>{
    //return this.http.get('http://127.0.0.1:5000/static/progresoSerieA.png', { responseType: 'blob' })
    return this.http.get('https://tfg-pj2s.onrender.com/static/progresoSerieA.png', { responseType: 'blob' })
   }


}

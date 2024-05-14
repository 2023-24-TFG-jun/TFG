import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsIAService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    //http://127.0.0.1:5000
    //https://tfg-pj2s.onrender.com
    
    return this.http.post('https://tfg-pj2s.onrender.com/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getProcessedVideo(filename: string) {
    return this.http.get(`https://tfg-pj2s.onrender.com/get-video/${filename}`, { responseType: 'blob' });
}

}


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

   
    return this.http.post('http://127.0.0.1:5000/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getProcessedVideo(filename: string) {
    return this.http.get(`http://127.0.0.1:5000/get-video/${filename}`, { responseType: 'blob' });
}

}


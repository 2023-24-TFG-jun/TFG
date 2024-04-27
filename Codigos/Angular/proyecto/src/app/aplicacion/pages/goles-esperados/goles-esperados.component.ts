import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { XG } from 'src/app/interfaces/xG.interface';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-goles-esperados',
    standalone: true,
    templateUrl: './goles-esperados.component.html',
    styleUrl: './goles-esperados.component.css',
    imports: [SpacerComponent, CommonModule, MatMenuModule, MatButtonModule, MatIconModule]
})
export class GolesEsperadosComponent implements OnInit{

  imgxG: any;
  xgData!: XG;
  loading: boolean = false;
  constructor(private router: Router, private backendService: BackendService){

  }
  ngOnInit() {
    
  }
  navegarC(){
    this.router.navigate(['/Predicciones']);
  }

  navegarxG(){
    this.router.navigate(['/xG']);
  }

  navegarMundial(){
    this.router.navigate(['/mundial']);
  }

  golesEsperadosImg(){
    this.loading = true;
    this.backendService.golesEsperadosImg().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgxG = objectUrl;
        this.loading = false;
      },
      
      error: (error) => {

        console.error('Error al obtener los datos', error);
      }
    });
  }

  obtenerGolesEsperados(){
    this.loading = true;
    this.backendService.golesEsperados().subscribe({
      next: (data: XG) => {
        this.xgData = data;
        this.golesEsperadosImg();
        console.log(this.xgData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos de goles esperados', error);
      }
    })
  }

}

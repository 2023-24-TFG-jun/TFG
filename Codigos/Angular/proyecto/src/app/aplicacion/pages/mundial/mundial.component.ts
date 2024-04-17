import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { BackendService } from 'src/app/services/backend.service';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
    selector: 'app-mundial',
    standalone: true,
    templateUrl: './mundial.component.html',
    styleUrl: './mundial.component.css',
    imports: [SpacerComponent, CommonModule, MatListModule], 
})
export class MundialComponent implements OnInit {

  loading: boolean = false;
  imgMM: any;
  imgGA: any;
  imgMessi: any;
  imgMbappe: any;
  imgML: any;
  imgMP: any;

  constructor(private router: Router, private backendService: BackendService){

  }
  ngOnInit(){
    this.matchMomentumImg();
    this.goalArgentina();
    this.messiMap();
    this.mbappeMap();
    this.locationMessiMap();
    this.passMessiMap();
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


  matchMomentumImg(){
    this.loading = true;
    this.backendService.matchMomentumFinal().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgMM = objectUrl;
        this.loading = false;
      },
      
      error: (error) => {

        console.error('Error al obtener los datos', error);
      }
    });
  }

  goalArgentina(){
    this.loading=true;
    this.backendService.goalArgentina().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgGA = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  messiMap(){
    this.loading=true;
    this.backendService.messiMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgMessi = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  mbappeMap(){
    this.loading=true;
    this.backendService.mbappeMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgMbappe = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationMessiMap(){
    this.loading=true;
    this.backendService.messiLocationMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgML = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  passMessiMap(){
    this.loading=true;
    this.backendService.messiPassMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgMP = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }



}

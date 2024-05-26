import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { CommonModule } from '@angular/common';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { forkJoin } from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
    selector: 'app-predicciones',
    templateUrl: './predicciones.component.html',
    standalone: true,
    styleUrls: ['./predicciones.component.css'],
    imports: [CommonModule, SpacerComponent,MatMenuModule, MatButtonModule, MatIconModule, FlexLayoutModule]
})
export class PrediccionesComponent implements OnInit {

  constructor(private router: Router, private backendService: BackendService) { }

  laLigaData : any;
  laLigaRealData: any;
  premierData : any;
  premierRealData: any;
  serieAData : any;
  SerieARealData: any;
  bundesligaData : any;
  bundesligaRealData: any;
  ligue1Data : any;
  ligue1RealData: any;
  loading: boolean = false;
  loaded:boolean = false;
  imgLigue1: any;
  imgProgresoBundesliga: any;
  imgProgresoLaLiga: any;
  imgProgresoPremier:any;
  imgProgresoSerieA: any;

  ngOnInit(): void {
    
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

  //La liga 
  
  getLaLigaData() {
    this.loading = true;
    forkJoin({
      laLiga: this.backendService.getLaLiga(),
      realLaLiga: this.backendService.getRealLaLiga()
    }).subscribe({
      next: (results) => {
        const { laLiga, realLaLiga } = results;
  
        const xPts = laLiga.LaLigaStandingP.xPts;
        this.laLigaData = Object.keys(xPts).map(key => ({
          equipo: key,
          puntos: xPts[key]
        })).sort((a, b) => b.puntos - a.puntos);
  
        this.laLigaRealData = realLaLiga.response[0].league.standings[0].map((standing, index) => ({
          rank: index + 1,
          equipo: standing.team.name,
          puntos: standing.points
        }));
  
        this.loading = false;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos', error);
        this.loading = false;
      }
    });
  }

  Laliga(event: MouseEvent){
    event.stopPropagation();
    if (!this.loaded) { 
        this.getLaLigaData();
        this.progresoLaLiga();
    } else { 
        this.laLigaData = []; 
        this.laLigaRealData = []
        this.loaded = false; 
    }
  }


  //PREMIER LEAGUE
  //La liga 
  
  getPremierData() {
    this.loading = true;
    forkJoin({
      premier: this.backendService.getPremier(),
      realPremier: this.backendService.getRealPremier()
    }).subscribe({
      next: (results) => {
        const { premier, realPremier } = results;
        const xPts = premier.PremierStandingP.xPts;
        this.premierData = Object.keys(xPts).map(key => ({
          equipo: key,
          puntos: xPts[key]
        })).sort((a, b) => b.puntos - a.puntos);
  
        this.premierRealData = realPremier.response[0].league.standings[0].map((standing, index) => ({
          rank: index + 1,
          equipo: standing.team.name,
          puntos: standing.points
        }));
  
        this.loading = false;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos', error);
        this.loading = false;
      }
    });
  }

  premier(event: MouseEvent){
    event.stopPropagation();
    if (!this.loaded) { 
        this.getPremierData();
        this.progresoPremier();
    } else { 
        this.premierData = []; 
        this.premierRealData = []
        this.loaded = false; 
    }
  }

  // SERIEA
  getSerieAData() {
    this.loading = true;
    forkJoin({
      serieA: this.backendService.getSerieA(),
      realSerieA: this.backendService.getRealSerieA()
    }).subscribe({
      next: (results) => {
        const { serieA, realSerieA } = results;
        const xPts = serieA.SerieAStantding.xPts;
        this.serieAData = Object.keys(xPts).map(key => ({
          equipo: key,
          puntos: xPts[key]
        })).sort((a, b) => b.puntos - a.puntos);
  
        this.SerieARealData = realSerieA.response[0].league.standings[0].map((standing, index) => ({
          rank: index + 1,
          equipo: standing.team.name,
          puntos: standing.points
        }));
  
        this.loading = false;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos', error);
        this.loading = false;
      }
    });
  }

  serieA(event: MouseEvent){
    event.stopPropagation();
    if (!this.loaded) { 
        this.getSerieAData();
        this.progresoSerieA();
    } else { 
        this.serieAData = []; 
        this.SerieARealData = []
        this.loaded = false; 
    }
  }

  //BUNDESLIGA
  getBundesligaData() {
    this.loading = true;
    forkJoin({
      bundesliga: this.backendService.getBundesliga(),
      realBundesliga: this.backendService.getRealBundesliga()
    }).subscribe({
      next: (results) => {
        const { bundesliga, realBundesliga } = results;
        const xPts = bundesliga.BundesligaStanding.xPts;
        this.bundesligaData = Object.keys(xPts).map(key => ({
          equipo: key,
          puntos: xPts[key]
        })).sort((a, b) => b.puntos - a.puntos);
  
        this.bundesligaRealData = realBundesliga.response[0].league.standings[0].map((standing, index) => ({
          rank: index + 1,
          equipo: standing.team.name,
          puntos: standing.points
        }));
  
        this.loading = false;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos', error);
        this.loading = false;
      }
    });
  }

  bundesliga(event: MouseEvent){
    event.stopPropagation();
    if (!this.loaded) { 
        this.getBundesligaData();
        this.progresoBundesliga();
    } else { 
        this.bundesligaData = []; 
        this.bundesligaRealData = []
        this.loaded = false; 
    }
  }

  //LIGUE1
  getLigue1Data() {
    this.loading = true;
    forkJoin({
      ligue1: this.backendService.getLigue1(),
      realLigue1: this.backendService.getRealLigue1()
    }).subscribe({
      next: (results) => {
        const { ligue1, realLigue1 } = results;
        const xPts = ligue1.Ligue1Standing.xPts;
        this.ligue1Data = Object.keys(xPts).map(key => ({
          equipo: key,
          puntos: xPts[key]
        })).sort((a, b) => b.puntos - a.puntos);
  
        this.ligue1RealData = realLigue1.response[0].league.standings[0].map((standing, index) => ({
          rank: index + 1,
          equipo: standing.team.name,
          puntos: standing.points
        }));
  
        this.loading = false;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos', error);
        this.loading = false;
      }
    });
  }

  ligue1(event: MouseEvent){
    event.stopPropagation();
    if (!this.loaded) { 
        this.getLigue1Data();
        this.Ligue1();
    } else { 
        this.ligue1Data = []; 
        this.ligue1RealData = []
        this.loaded = false; 
    }
  }


  Ligue1(){
    this.loading=true;
    this.backendService.Ligue1().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLigue1 = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  progresoBundesliga(){
    this.loading=true;
    this.backendService.progresoBundesliga().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgProgresoBundesliga = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  progresoLaLiga(){
    this.loading=true;
    this.backendService.progresoLaLiga().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgProgresoLaLiga = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  progresoPremier(){
    this.loading=true;
    this.backendService.progresoPremier().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgProgresoPremier = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  progresoSerieA(){
    this.loading=true;
    this.backendService.progresoSerieA().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgProgresoSerieA = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }
}

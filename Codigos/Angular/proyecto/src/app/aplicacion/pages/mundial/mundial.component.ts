import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import { BackendService } from 'src/app/services/backend.service';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-mundial',
    standalone: true,
    templateUrl: './mundial.component.html',
    styleUrl: './mundial.component.css',
    imports: [SpacerComponent, CommonModule, MatListModule,MatMenuModule, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule], 
})
export class MundialComponent implements OnInit {

  mapasCalor = ["Enzo Fernández", "Jules Koundé", "Kylian Mbappé", "Lionel Messi", "Rodrigo De Paul", "Aurélien Tchouaméni"];
  locations = ["Enzo Fernández", "Jules Koundé", "Kylian Mbappé", "Lionel Messi", "Rodrigo De Paul", "Aurélien Tchouaméni"];
  pases = ["Enzo Fernández", "Jules Koundé", "Kylian Mbappé", "Lionel Messi"];
  porterias = ["Argentina", "Francia"];

  miFormulario: FormGroup = this.fb.group({
    selector1: 'Argentina',
    selector2: 'Lionel Messi',
    selector3: 'Kylian Mbappé',
    selector4: 'Kylian Mbappé',
  });

  loading: boolean = false;
  imgMM: any;
  imgGA: any;
  imgMessi: any;
  imgMbappe: any;
  imgML: any;
  imgMP: any;
  imgEnzoMap: any;
  imgKoundeMap: any;
  imgRodrigoDePaulMap: any;
  imgTchouameniMap: any;
  imgGoalFrance: any;
  imgLocationEnzo: any;
  imgLocationKounde: any;
  imgLocationMbappe: any;
  imgLocationRodrigoDePaul: any;
  imgLocationTchouameni: any;
  imgPasesEnzo: any;
  imgPasesKounde: any;
  imgPasesMbappe: any;


  constructor(private router: Router, private backendService: BackendService, private fb : FormBuilder){

  }
  ngOnInit(){
    this.matchMomentumImg();
    this.goalArgentina();
    this.messiMap();
    this.mbappeMap();
    this.locationMessiMap();
    this.passMessiMap();
    this.enzoMap();
    this.koundeMap();
    this.rodrigoDePaulMap();
    this.tchouameniMap();
    this.goalFrance();
    this.locationEnzo();
    this.locationKounde();
    this.locationMbappe();
    this.locationRodrigoDePaul();
    this.locationTchouameni();
    this.pasesEnzo();
    this.pasesKounde();
    this.pasesMbappe();
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

  enzoMap(){
    this.loading=true;
    this.backendService.enzoMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgEnzoMap = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  koundeMap(){
    this.loading=true;
    this.backendService.koundeMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgKoundeMap = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  rodrigoDePaulMap(){
    this.loading=true;
    this.backendService.rodrigoDePaulMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgRodrigoDePaulMap = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  tchouameniMap(){
    this.loading=true;
    this.backendService.tchouameniMap().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgTchouameniMap = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  goalFrance(){
    this.loading=true;
    this.backendService.goalFrance().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgGoalFrance = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationEnzo(){
    this.loading=true;
    this.backendService.locationEnzo().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLocationEnzo = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationKounde(){
    this.loading=true;
    this.backendService.locationKounde().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLocationKounde = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationMbappe(){
    this.loading=true;
    this.backendService.locationMbappe().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLocationMbappe = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationRodrigoDePaul(){
    this.loading=true;
    this.backendService.locationRodrigoDePaul().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLocationRodrigoDePaul = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  locationTchouameni(){
    this.loading=true;
    this.backendService.locationTchouameni().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgLocationTchouameni = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  pasesEnzo(){
    this.loading=true;
    this.backendService.pasesEnzo().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgPasesEnzo = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  pasesKounde(){
    this.loading=true;
    this.backendService.pasesKounde().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgPasesKounde = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }

  pasesMbappe(){
    this.loading=true;
    this.backendService.pasesMbappe().subscribe({
      next: (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imgPasesMbappe = objectUrl;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });
  }




  
}

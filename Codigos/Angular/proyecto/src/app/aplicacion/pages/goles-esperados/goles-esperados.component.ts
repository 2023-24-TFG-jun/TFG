import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goles-esperados',
  standalone: true,
  imports: [],
  templateUrl: './goles-esperados.component.html',
  styleUrl: './goles-esperados.component.css'
})
export class GolesEsperadosComponent {

  constructor(private router: Router){

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

}

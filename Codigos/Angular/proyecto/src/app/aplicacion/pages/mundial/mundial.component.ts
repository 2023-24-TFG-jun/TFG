import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mundial',
  standalone: true,
  imports: [],
  templateUrl: './mundial.component.html',
  styleUrl: './mundial.component.css'
})
export class MundialComponent {
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

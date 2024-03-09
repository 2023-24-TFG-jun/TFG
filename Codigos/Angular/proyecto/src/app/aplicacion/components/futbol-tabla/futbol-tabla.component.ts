import { Component, Input } from '@angular/core';
import { League } from 'src/app/interfaces/competiciones.interface';

@Component({
  selector: 'app-futbol-tabla',
  templateUrl: './futbol-tabla.component.html',
  styleUrl: './futbol-tabla.component.css'
})
export class FutbolTablaComponent {

  @Input() ligas: League[] = [];

}

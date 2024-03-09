import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutbolTablaComponent } from './futbol-tabla/futbol-tabla.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FutbolTablaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    FutbolTablaComponent
  ]
})
export class ComponentesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './pages/inicio/inicio.component';
import { PartidosComponent } from './pages/partidos/partidos.component';
import { PrediccionesComponent } from './pages/predicciones/predicciones.component';
import { SportIAComponent } from './pages/sport-ia/sport-ia.component';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    InicioComponent,
    PartidosComponent,
    SportIAComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [

  ]
})
export class AplicacionModule { }

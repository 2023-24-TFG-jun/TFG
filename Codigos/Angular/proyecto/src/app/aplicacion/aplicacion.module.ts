import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompeticionesComponent } from './pages/competiciones/competiciones.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PartidosComponent } from './pages/partidos/partidos.component';
import { PrediccionesComponent } from './pages/predicciones/predicciones.component';
import { SportIAComponent } from './pages/sport-ia/sport-ia.component';




@NgModule({
  declarations: [
    CompeticionesComponent,
    EquiposComponent,
    InicioComponent,
    PartidosComponent,
    PrediccionesComponent,
    SportIAComponent
  ],
  imports: [
    CommonModule,
    CompeticionesComponent,
    EquiposComponent,
    InicioComponent,
    PartidosComponent,
    PrediccionesComponent,
    SportIAComponent
  ]
})
export class AplicacionModule { }

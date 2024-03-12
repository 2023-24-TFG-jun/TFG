import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompeticionesComponent } from './pages/competiciones/competiciones.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PartidosComponent } from './pages/partidos/partidos.component';
import { PrediccionesComponent } from './pages/predicciones/predicciones.component';
import { SportIAComponent } from './pages/sport-ia/sport-ia.component';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from './components/componentes.module';





@NgModule({
  declarations: [
    
    EquiposComponent,
    InicioComponent,
    PartidosComponent,
    PrediccionesComponent,
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

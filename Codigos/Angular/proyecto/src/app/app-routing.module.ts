import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Imports de componentes
import { InicioComponent } from './aplicacion/pages/inicio/inicio.component';
import { PartidosComponent } from './aplicacion/pages/partidos/partidos.component';
import { EquiposComponent } from './aplicacion/pages/equipos/equipos.component';
import { CompeticionesComponent } from './aplicacion/pages/competiciones/competiciones.component';
import { SportIAComponent } from './aplicacion/pages/sport-ia/sport-ia.component';
import { PrediccionesComponent } from './aplicacion/pages/predicciones/predicciones.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    pathMatch: 'full'
  },
  {
    path: 'Partidos',
    component: PartidosComponent,
  },
  {
    path: 'Equipos',
    component: EquiposComponent,
  },
  {
    path: 'Competiciones',
    component: CompeticionesComponent,
  },
  {
    path: 'SportIA',
    component: SportIAComponent,
  },
  {
    path: 'Predicciones',
    component: PrediccionesComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

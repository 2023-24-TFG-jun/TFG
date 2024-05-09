import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportIAComponent } from './pages/sport-ia/sport-ia.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';





@NgModule({
  declarations: [
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FlexLayoutModule,
    ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
    ],
  exports: [

  ]
})
export class AplicacionModule { }

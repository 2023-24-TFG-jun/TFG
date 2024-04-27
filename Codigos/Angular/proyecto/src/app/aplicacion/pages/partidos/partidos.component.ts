import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatchesService } from '../../../services/matches.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { Ligas } from 'src/app/interfaces/ligas.interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FootballService } from 'src/app/services/football.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';
registerLocaleData(localeEs, 'es');
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import Swal from 'sweetalert2';


@Component({
    selector: 'app-partidos',
    standalone: true,
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    templateUrl: './partidos.component.html',
    styleUrls: ['./partidos.component.css'],
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FlexLayoutModule, MatNativeDateModule, ReactiveFormsModule, MatSelectModule, MatCardModule, SpacerComponent]
})
export class PartidosComponent implements OnInit {

  

  public termino: string ='';
  public equipo: string ='';
  public hayError: boolean = false;
  selectedSeason: number = 2023;
  debouncer: Subject<string> = new Subject();
  sugerenciasLigas: Ligas['response'][number]['league'][] = [];
  mostrarSugerencias : boolean = false;
  public anios: number[] = [];
  ligaId: number | undefined;
  equipoId!: number | undefined;
  partidosR: any;

  miFormulario: FormGroup = this.fb.group({
    termino: '',
    equipo: '',
    season: 2023,
    date: ''
  });


  constructor(private matchesService: MatchesService, private footballService: FootballService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerAnios(); 
    this.setupListeners();

    // this.debouncer.pipe(
    //   debounceTime(300), // Agrega un retraso de 300ms antes de emitir el último valor
    //   distinctUntilChanged(), // Evita emitir el valor si no ha cambiado desde la última emisión
    //   switchMap(term => term ? this.matchesService.buscarSugerenciasLiga(term) : of([])) // Hace la llamada a la API si el término no está vacío
    // ).subscribe(sugerencias => {
    //   console.log('INIT',sugerencias);
    //   this.sugerenciasLigas = sugerencias;
    //   this.mostrarSugerencias = true; // Muestra sugerencias si hay alguna
    // });

    

    this.miFormulario.get('date')?.valueChanges.pipe(
      tap(date => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        this.miFormulario.get('date')?.setValue(formattedDate, { emitEvent: false });
      })
    ).subscribe();

  }

  private setupListeners() {
    this.miFormulario.get('termino')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.length >= 2),
        switchMap(term => term ? this.matchesService.buscarSugerenciasLiga(term) : of([]))
      ).subscribe(sugerencias => {
        console.log(sugerencias);
        this.sugerenciasLigas = sugerencias;
        this.mostrarSugerencias = true;
      });
  }

  obtenerAnios(){
    this.footballService.getAniosDisponibles().subscribe(
      (anios :number[]) => {
        const aniosExcluidos = [2008, 2009, 2024, 2025, 2026];
        this.anios = anios.filter(anio => !aniosExcluidos.includes(anio));
      },
      error => {
        console.error('Erros al obtener los años: ', error);
      }
    )
  }

  // buscarLiga(nombreLiga: string) {
  //   if (!nombreLiga.trim()) {
  //     this.hayError = true;
  //     return;
  //   }
  
  //   this.matchesService.buscarLigaPorNombre(nombreLiga)
  //     .pipe(
  //       tap((ligaID) => console.log('Liga ID:', ligaID)),
  //       filter(ligaID => ligaID !== undefined), 
  //     )
  //     .subscribe({
  //       next: (resp) => {
    
  //         this.hayError = false;
  //       },
  //       error: (error) => {
  //         this.hayError = true;
    
  //         console.error('Error en el proceso de búsqueda: ', error);
  //       }
  //     });

   
  // }

  // obtenerSugerencias(termino:string){
  //   this.matchesService.buscarSugerenciasLiga(termino)
  //   .subscribe(sugerencias => {
  //     this.sugerenciasLigas = sugerencias;
  //     this.mostrarSugerencias = true;
      
  //   });
  // }

  teclaPresionada() {
    // this.debouncer.next( this.termino );
    // if(this.termino.length >=2){
    //   this.obtenerSugerencias(this.termino);
    // } else {
    //   this.mostrarSugerencias = false;
    //   this.sugerenciasLigas=[];

    // }
    //this.obtenerSugerencias(this.termino);
    const value = this.miFormulario.get('termino')?.value;
    this.debouncer.next(value);
  }

  seleccionarSugerencia(liga: Ligas['response'][number]['league']): void {
    this.miFormulario.get('termino')?.setValue(liga.name);
    this.mostrarSugerencias = false;
  }




  onSubmit() {
    const values = this.miFormulario.value;
  
    //const formattedDate =  moment(values.date).format('YYYY-MM-DD');
    const formattedDate =  values.date ? moment(values.date).format('YYYY-MM-DD') : undefined;
    values.date = formattedDate;

    // Obtenemos el id de la liga
    this.matchesService.buscarLigaPorNombre(values.termino).subscribe(ligaIdResp => {
      this.ligaId = ligaIdResp;
      console.log('LIGAAA',ligaIdResp);

      // Obtenemos el id del equipo
      this.matchesService.buscarEquipoPorNombre(values.equipo).subscribe(equipoResp => {
        console.log('EQUIPOOO',equipoResp?.team.id);
        this.equipoId = equipoResp?.team.id;
        //Obtenemos los partidos

        if(this.ligaId || this.equipoId){
          this.matchesService.obtenerPartidos( values.season, values.date, ligaIdResp, equipoResp?.team.id ).subscribe(partidos =>{
            console.log('partidosss',partidos);
            this.partidosR = partidos.response;

            if(this.partidosR.length == 0){
              Swal.fire({
                icon: "error",
                title: "Error en la búsqueda",
                text: "No hay partidos para este equipo o liga en la fecha seleccionada.",
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Búsqueda realizada correctamente"
              });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error en la búsqueda",
            text: "No se ha especificado un equipo, liga o para la búsqueda",
          });
        }

      });
    });


    // Envía `dataToSend` a la API
    //console.log('Datos enviados a la API:', dataToSend);
  }

    // onYearSelected(season: number){
  
  //   if (this.miFormulario.get('season')) {
  //     this.miFormulario.get('season')?.setValue(season);
  //     this.selectedSeason = season; 
  //   }

  //   if(this.termino){
  //     this.buscarLiga(this.termino);
  //   }
  // }

}

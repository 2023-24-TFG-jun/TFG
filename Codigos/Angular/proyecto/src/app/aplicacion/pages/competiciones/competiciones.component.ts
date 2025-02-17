import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { League, Standing } from 'src/app/interfaces/competiciones.interface';
import { FootballService } from 'src/app/services/football.service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Ligas } from 'src/app/interfaces/ligas.interfaces';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: 'app-competiciones',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, FlexLayoutModule ],
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.css']
})
export class CompeticionesComponent implements OnInit {

  public termino: string ='';
  public selectedSeason: number = 2023;
  public standings: Standing[][]= [];
  public hayError: boolean = false;
  public anios: number[] = [];
  public leagueInfo: League | null = null;
  sugerenciasLigas: Ligas['response'][number]['league'][] = [];
  mostrarSugerencias : boolean = false;
  debouncer: Subject<string> = new Subject();
  @Output() onEnter : EventEmitter<string> = new EventEmitter();

  constructor(private footballService: FootballService) { }


  ngOnInit(): void {
      this.obtenerAnios();  
  }

  buscarLiga() {
    if (!this.termino.trim()) {
      this.hayError = true;
      return;
    }
  
    this.footballService.buscarLigaPorNombre(this.termino)
      .pipe(
        tap((ligaID) => console.log('Liga ID:', ligaID)),
        filter(ligaID => ligaID !== undefined), 
        switchMap(ligaID => 
          this.footballService.obtenerClasificacion(ligaID!, this.selectedSeason)
        )
      )
      .subscribe({
        next: (resp) => {
          this.leagueInfo = resp.response[0].league;
          this.standings = resp.response[0].league.standings;
          this.hayError = false;
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
        },
        error: (error) => {
          this.hayError = true;
          this.standings = [];
          console.error('Error en el proceso de búsqueda: ', error);
        }
      });

   
  }


  obtenerStanding(leagueId: number, season: number){
    this.footballService.obtenerClasificacion(leagueId, season)
    .subscribe( resp =>{
      this.standings = resp.response[0].league.standings;
      this.hayError = false;
    },
    error => {
      console.error('Error al obtener las clasificaciones: ', error);
      this.hayError = true;
      
    }
    );
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

  onYearSelected(season: number){
    this.selectedSeason = season;
    if(this.termino){
      this.buscarLiga();
    }
  }


  obtenerSugerencias(termino:string){
    this.footballService.buscarSugerenciasLiga(termino)
    .subscribe(sugerencias => {
      this.sugerenciasLigas = sugerencias;
      this.mostrarSugerencias = true;
      
    });
  }

  seleccionarSugerencia(liga: Ligas['response'][number]['league']): void {
    this.termino = liga.name;
    this.mostrarSugerencias = false;
  }


  buscar() {
    this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino );
    if(this.termino.length >=2){
      this.obtenerSugerencias(this.termino);
    } else {
      this.mostrarSugerencias = false;
      this.sugerenciasLigas=[];

    }
    this.obtenerSugerencias(this.termino);
  }
}

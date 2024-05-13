import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, EventEmitter, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Subject, forkJoin, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/teams.interface';
import { Missed } from 'src/app/interfaces/teamsStatistics.interface';
import { FootballService } from 'src/app/services/football.service';
import { TeamsService } from 'src/app/services/teams.service';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
registerLocaleData(localeEs, 'es');
import localeEs from '@angular/common/locales/es';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import Swal from 'sweetalert2';
import { FlexLayoutModule } from "@angular/flex-layout";


@Component({
    selector: 'app-equipos',
    templateUrl: './equipos.component.html',
    standalone: true,
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    styleUrls: ['./equipos.component.css'],
    imports: [CommonModule, FormsModule, HighchartsChartModule, SpacerComponent, MatSelectModule, MatFormFieldModule, MatInputModule, FlexLayoutModule]

})
export class EquiposComponent implements OnInit {
  public termino: string ='';
  public selectedSeason: number = 2023;

  public hayError: boolean = false;
  public anios: number[] = [];
 
  mostrarSugerencias : boolean = false;
  debouncer: Subject<string> = new Subject();
  @Output() onEnter : EventEmitter<string> = new EventEmitter();
  teamInfo: Response | any;
  sugerenciasEquipos: any;
  selectedLeagueId!: number;

  constructor(private teamsService: TeamsService, private footballService: FootballService) { }

  ngOnInit(): void {
    this.obtenerAnios();  

  }

  //BUSCAR EQUIPO
  buscarEquipo(nombreEquipo: string) {
    if (!nombreEquipo.trim()) {
      this.hayError = true;
      return;
    }
  
    this.hayError = false;
  
    this.teamsService.buscarEquipoPorNombre(nombreEquipo)
      .pipe(
        tap((equipo) => console.log('Equipo:', equipo)),
        switchMap(equipo => {
          if (!equipo) {
            throw new Error('Equipo no encontrado');
          }
          return this.teamsService.obtenerIDLiga(equipo.team.id).pipe(
            map(idLiga => ({ teamData: equipo, idLiga }))
          );
        }),
        tap(({ idLiga }) => {
          if (!idLiga) {
            throw new Error('ID de la liga no encontrado');
          }
          this.selectedLeagueId = idLiga;
        }),
        switchMap(({ teamData, idLiga }) => 
        forkJoin({
          statistics: this.teamsService.obtenerDatos(idLiga!, this.selectedSeason, teamData.team.id),
          nextFixtures: this.teamsService.nextFixtures(teamData.team.id),
          lastFixtures: this.teamsService.lastFixtures(teamData.team.id),
          squads: this.teamsService.squad(teamData.team.id)
        }).pipe(
          map(results => ({
            team: teamData.team,
            venue: teamData.venue,
            statistics: results.statistics.response,
            nextFixtures: results.nextFixtures.response,
            lastFixtures: results.lastFixtures.response,
            squads: results.squads.response
          }))   
        )
      )
    )
      .subscribe({
        next: (resp) => {
          this.teamInfo = resp;
          console.log('respuesta de team info', this.teamInfo);
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
          Swal.fire({
            icon: "error",
            title: "Error en la búsqueda",
            text: "Nombre de equipo incorrecto",
          });
        }
      });
  }
  


  //MIRAR LAS SUGERENCIAS
  obtenerSugerencias(){
    if (!this.selectedLeagueId || !this.selectedSeason) {
      console.error('La liga o la temporada no están definidas');
      this.mostrarSugerencias = false;
      return;
    }
    console.log(`Buscando sugerencias para la liga ${this.selectedLeagueId} y la temporada ${this.selectedSeason}`);
    this.teamsService.buscarSugerenciasEquipo(this.selectedLeagueId,this.selectedSeason)
    .subscribe((sugerencias: Team[]) => {
      console.log('Sugerencias recibidas:', sugerencias);
      this.sugerenciasEquipos = sugerencias;
      this.mostrarSugerencias = true;
      
    });
  }

  seleccionarSugerencia(equipo: Team): void {
    this.termino = equipo.name;
    this.buscarEquipo(equipo.name);
    this.mostrarSugerencias = false;
  }


  teclaPresionada() {
    this.debouncer.next( this.termino );
    this.debouncer.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(termino => { 
      if(termino.length >=2){
        this.obtenerSugerencias();
      } else {
        this.mostrarSugerencias = false;
        this.sugerenciasEquipos=[];
      }
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

  onYearSelected(season: number){
    this.selectedSeason = season;
    if(this.termino){
      this.buscarEquipo(this.termino);
    }
  }

  getMissedValues(value: any): Missed {
    return value as Missed;
  }





}



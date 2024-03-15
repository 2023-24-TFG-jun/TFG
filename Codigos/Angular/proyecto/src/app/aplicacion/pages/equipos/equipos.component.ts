import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Team } from 'src/app/interfaces/teamsStatistics.interface';
import { FootballService } from 'src/app/services/football.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  public termino: string ='';
  public selectedSeason: number = 2023;

  public hayError: boolean = false;
  public anios: number[] = [];
 
  mostrarSugerencias : boolean = false;
  debouncer: Subject<string> = new Subject();
  @Output() onEnter : EventEmitter<string> = new EventEmitter();
  leagueInfo: any;
  sugerenciasEquipos: any;

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
      filter(equipo => equipo !== undefined),
      switchMap(equipo => 
        this.teamsService.obtenerIDLiga(equipo!.id).pipe(
          switchMap(idLiga => 
            this.teamsService.obtenerDatos(idLiga!, this.selectedSeason, equipo!.id)
          )
        )
      )
      )
      .subscribe({
        next: (resp) => {
          this.leagueInfo = resp;
          this.hayError = false;
        },
        error: (error) => {
          this.hayError = true;
          console.error('Error en el proceso de búsqueda: ', error);
        }
      });

   
  }


  //MIRAR LAS SUGERENCIAS
  obtenerSugerencias(termino:string){
    this.footballService.buscarSugerenciasLiga(termino)
    .subscribe((sugerencias: Team[]) => {
      this.sugerenciasEquipos = sugerencias;
      this.mostrarSugerencias = true;
      
    });
  }

  seleccionarSugerencia(equipo: Team): void {
    this.termino = equipo.name;
    this.buscarEquipo(equipo.name);
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
      this.sugerenciasEquipos=[];

    }
    this.obtenerSugerencias(this.termino);
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

}



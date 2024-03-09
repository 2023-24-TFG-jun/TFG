import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Competiciones, League, Standing } from 'src/app/interfaces/competiciones.interface';
import { FootballService } from 'src/app/services/football.service';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-competiciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.css']
})
export class CompeticionesComponent implements OnInit {

  public termino: string ='';
  //ligas: League[] = [];
  public selectedSeason: number = 2022;
  public standings: Standing[][]= [];
  public hayError: boolean = false;
  public anios: number[] = [];
  public leagueInfo: League | null = null;

  constructor(private footballService: FootballService) { }


  ngOnInit(): void {
    /*
    this.footballService.obtenerLigas().subscribe((resp: Competiciones) => {
      // Asumiendo que la respuesta tiene una estructura { ligas: [...] }
      this.ligas = resp.response.map(item =>item.league);
    });
    this.obtenerStanding(this.selectedLeagueId, this.selectedSeason);
    */
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( (nombreLiga) => {
        this.buscarLiga(nombreLiga);
      });
      this.obtenerAnios();
    
  }

  buscarLiga(nombreLiga: string) {
    if (!nombreLiga.trim()) {
      this.hayError = true;
      return;
    }
  
    this.footballService.buscarLigaPorNombre(nombreLiga)
      .pipe(
        tap((ligaID) => console.log('Liga ID:', ligaID)),
        filter(ligaID => ligaID !== undefined), // Filtrar los undefined
        switchMap(ligaID => 
          // En este punto, ligaID no es undefined por el filtro aplicado.
          this.footballService.obtenerClasificacion(ligaID!, this.selectedSeason)
        )
      )
      .subscribe({
        next: (resp) => {
          this.leagueInfo = resp.response[0].league;
          // Respuesta con los datos de las clasificaciones
          this.standings = resp.response[0].league.standings;
          this.hayError = false;
          console.log(this.standings);
        },
        error: (error) => {
          // Error en el proceso de búsqueda o al obtener clasificaciones
          this.hayError = true;
          this.standings = [];
          console.error('Error en el proceso de búsqueda: ', error);
        }
      });

   
  }


  obtenerStanding(leagueId: number, season: number){
    this.footballService.obtenerClasificacion(leagueId, season)
    .subscribe( resp =>{
      console.log(resp);//REVISARRRRRRRRRRR
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
        this.anios = anios;
      },
      error => {
        console.error('Erros al obtener los años: ', error);
      }
    )
  }

  onYearSelected(season: number){
    this.selectedSeason = season;
    if(this.termino){
      this.buscarLiga(this.termino);
    }
  }

  //FUTBOL INPUT
  @Output() onEnter : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();


  buscar() {
    this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino );
  }
}

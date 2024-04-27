import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SpacerComponent } from "../../../shared/spacer/spacer.component";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    standalone: true,
    styleUrls: ['./inicio.component.css'],
    imports: [CommonModule, FlexLayoutModule, SpacerComponent]
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

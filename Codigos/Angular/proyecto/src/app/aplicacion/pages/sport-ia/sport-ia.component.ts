import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SportsIAService } from '../../../services/sports-ia.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SpacerComponent } from "../../../shared/spacer/spacer.component";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sport-ia',
    templateUrl: './sport-ia.component.html',
    standalone: true,
    styleUrls: ['./sport-ia.component.css'],
    imports: [CommonModule, FlexLayoutModule, SpacerComponent]
})
export class SportIAComponent implements OnInit {

  constructor( private http: HttpClient, private sportIaService: SportsIAService, private sanitizer: DomSanitizer) { }
  loading: boolean = false;

  ngOnInit(): void {
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  videoUrl: string | SafeUrl = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);  
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let files = element.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  openFileChooser() {
    this.fileInput.nativeElement.click(); 
  }

  processFile(file: File) {
    

    const ficheroValido = 'video/mp4';
    if (file.type !== ficheroValido){
      this.loading = false;
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "El fichero no es tipo .mp4. Por favor, introduce un fichero válido."
      });
      return;
    }
    this.sportIaService.uploadFile(file).subscribe(event => {
      this.loading=true;
      if (event.type === HttpEventType.Response) {
        const response = event.body as any;  
        if (response.filename) {
          console.log('Filename del archivo en front',response.filename);
          this.sportIaService.getProcessedVideo(response.filename).subscribe(data => {
            const blobUrl = window.URL.createObjectURL(data);
            this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
            this.loading = false;
          }, error => {
            console.error('Error al obtener el video procesado:', error);
            this.loading = false;
          });
        }
      }
    }, error => {
      console.error('Error al subir el archivo:', error);
      this.loading = false;
    });
  }

  handleError(event: any) {
    console.error('Error loading the video:', event);
  }
}

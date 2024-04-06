import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authGoogleService: AuthGoogleService,
    private router: Router){}

  tadaClass = false;
  rubberClass = false;
  rubberClass2 = false;
  rubberClass3 = false;
  rubberClass4 = false;
  rubberClass5 = false;
  rubberClass6 = false;

  animateElement() {
    this.tadaClass = true;
    setTimeout(() => this.tadaClass = false, 1000); 
  }

  animateMenu() {
    this.rubberClass = true;
    setTimeout(() => this.rubberClass = false, 1000); 
  }

  animateMenu2() {
    this.rubberClass2 = true;
    setTimeout(() => this.rubberClass2 = false, 1000); 
  }
  
  animateMenu3() {
    this.rubberClass3 = true;
    setTimeout(() => this.rubberClass3 = false, 1000); 
  }
  animateMenu4() {
    this.rubberClass4 = true;
    setTimeout(() => this.rubberClass4 = false, 1000); 
  }
  animateMenu5() {
    this.rubberClass5 = true;
    setTimeout(() => this.rubberClass5 = false, 1000);
  }
  animateMenu6() {
    this.rubberClass6 = true;
    setTimeout(() => this.rubberClass6 = false, 1000); 
  }

  logout(){


    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      text: "No podrás acceder a SportsIA ni a Predicciones",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Se ha cerrado sesión con éxito",
          icon: "success"
        });
        this.authGoogleService.logout();
        this.router.navigate(['/']);
      }
    });
  }

  alerta(){

    Swal.fire({
      icon: "info",
      title: "No ha iniciado sesión",
      text: "Inicia sesión para disfrutar de estas funcionalidades"
    });
  }
  
  
}

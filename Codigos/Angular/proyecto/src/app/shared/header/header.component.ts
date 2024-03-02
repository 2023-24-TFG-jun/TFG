import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private authGoogleService: AuthGoogleService,
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
    setTimeout(() => this.tadaClass = false, 1000); // La duración debe coincidir con la duración de tu animación
  }

  animateMenu() {
    this.rubberClass = true;
    setTimeout(() => this.rubberClass = false, 1000); // La duración debe coincidir con la duración de tu animación
  }

  animateMenu2() {
    this.rubberClass2 = true;
    setTimeout(() => this.rubberClass2 = false, 1000); // La duración debe coincidir con la duración de tu animación
  }
  
  animateMenu3() {
    this.rubberClass3 = true;
    setTimeout(() => this.rubberClass3 = false, 1000); // La duración debe coincidir con la duración de tu animación
  }
  animateMenu4() {
    this.rubberClass4 = true;
    setTimeout(() => this.rubberClass4 = false, 1000); // La duración debe coincidir con la duración de tu animación
  }
  animateMenu5() {
    this.rubberClass5 = true;
    setTimeout(() => this.rubberClass5 = false, 1000); // La duración debe coincidir con la duración de tu animación
  }
  animateMenu6() {
    this.rubberClass6 = true;
    setTimeout(() => this.rubberClass6 = false, 1000); // La duración debe coincidir con la duración de tu animación
  }

  logout(){
    this.authGoogleService.logout();
    this.router.navigate(['/']);
  }
}

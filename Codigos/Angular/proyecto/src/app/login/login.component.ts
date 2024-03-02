import { Component } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private authGoogleService: AuthGoogleService){}

  login(){
    this.authGoogleService.login();
  }

  
  showData(){
    const data = JSON.stringify(this.authGoogleService.getProfile())
    console.log(data);
  }
}

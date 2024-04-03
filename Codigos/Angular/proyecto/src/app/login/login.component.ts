import { Component } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  
  constructor( public authGoogleService: AuthGoogleService){}

  login(){
    this.authGoogleService.login();
  }

  showData(){
    this.authGoogleService.getProfile().then((data: any) => {
      console.log(JSON.stringify(data));
    });
  }
}

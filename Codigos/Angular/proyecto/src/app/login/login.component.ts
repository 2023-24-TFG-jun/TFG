import { Component } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';
import { CommonModule} from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SpacerComponent } from "../shared/spacer/spacer.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, FlexLayoutModule, SpacerComponent]
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

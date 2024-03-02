import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin();
   }

  initLogin(){
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '98567068249-0p3ut42hg8gogjl75tf6fu427n5lterd.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oAuthService.initLoginFlow();
  }

  // Método de logout para cuando lo implemente
  logout(){
    this.oAuthService.logOut();
  }

  // Para retornar los datos del perfil
  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }
}

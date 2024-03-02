import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  private isAuthenticated = new BehaviorSubject<boolean>(this.oAuthService.hasValidAccessToken());



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
    };

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.isAuthenticated.next(this.oAuthService.hasValidAccessToken());
    });
  }

  login(){
    this.oAuthService.initLoginFlow();
  }

  // Método de logout para cuando lo implemente
  logout(){
    this.oAuthService.logOut();
    this.isAuthenticated.next(false);
  }

  // Para retornar los datos del perfil
  getProfile(){
    return this.oAuthService.getIdentityClaims();
  }

  verificaAutenticacion(): Observable<boolean> {

    return this.isAuthenticated.asObservable();
  }

  get isLoggedIn(){
    return this.isAuthenticated.asObservable();
  }
}

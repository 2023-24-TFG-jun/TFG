import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGoogleService } from '../services/auth-google.service';
import {tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authGoogleService: AuthGoogleService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authGoogleService.verificaAutenticacion().pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['/Login']);
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authGoogleService.verificaAutenticacion().pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['/Login']);
        }
      })
    );
  }
}

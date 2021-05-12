import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { isEmpty, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private storageService: StorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token: string | null = this.storageService.getToken();
    if (token === null) {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
    console.log("van chay den day");
    return this.authService.getMe().pipe(
      map(user => {
        if (user !== null) {
          return true;
        }

        this.router.navigateByUrl('/sign-in');
        return false;
      })
    );
  }
}

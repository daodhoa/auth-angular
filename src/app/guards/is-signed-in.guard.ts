import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private storageService: StorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token : string | null = this.storageService.getToken();
      if (token === null) {
        return true;
      }

      return this.authService.getMe().pipe(
        map(user => {
          if (user) {
            this.router.navigateByUrl('');
            return false;
          } else {
            return true;
          }
        })
      );
  }
}

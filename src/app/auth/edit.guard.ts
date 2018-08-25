import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { AdService } from '../car-ad/ad.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private adService: AdService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.adService.getAdById(next.params.id)
      .pipe(map(res => {

        if (this.authService.getIsAdmin()) {
          return true;
        } else if (res['userUID'] === this.authService.getUserUID()) {
          return true;
        }
        this.router.navigate(['/car-ad/list']);
        return false;
      }));
  }

}


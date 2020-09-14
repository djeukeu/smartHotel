import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuestAuthService } from './guest-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestAuthGuard implements CanLoad {

  constructor(private guestAuth: GuestAuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.guestAuth.guestLog) {
        this.router.navigateByUrl('/login/guest');
      }
      return this.guestAuth.guestLog;
  }
}

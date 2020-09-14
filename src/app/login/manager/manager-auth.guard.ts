import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerAuthService } from './manager-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthGuard implements CanLoad {

  constructor(private managerAuth: ManagerAuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.managerAuth.managerLog) {
        this.router.navigateByUrl('/login/manager');
      }
      return this.managerAuth.managerLog;
  }
}

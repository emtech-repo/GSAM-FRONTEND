
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationGuard implements CanActivate {
//   constructor(private router: Router) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     const localdata = localStorage.getItem('currentUser');
//     if (localdata) {
//       return true;
//     } else {
//       this.router.navigateByUrl('/Authenticate');
//       return false;
//     }
//   }
// }








import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const localdata = localStorage.getItem('currentUser');
      if (localdata) {
        return true;
      }
    }

    this.router.navigateByUrl('/Authenticate');
    return false;
  }
}

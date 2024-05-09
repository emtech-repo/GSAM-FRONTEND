// import {  inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authenticationGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const localdata = localStorage.getItem('currentUser')
//   if(localdata){    
//     return true;
//   }
//   else{
//     router.navigateByUrl('/Authenticate')
//     return false;
//   }
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authenticationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const localdata = localStorage.getItem('currentUser');
    if (localdata) {
      return true;
    } else {
      this.router.navigateByUrl('/Authenticate');
      return false;
    }
  }
}









// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationGuard implements CanActivate {
//   constructor(private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const localdata = localStorage.getItem('currentUser');
//     if (localdata) {
//       return true;
//     } else {
//       this.router.navigateByUrl('/Authenticate');
//       return false;
//     }
//   }
// }

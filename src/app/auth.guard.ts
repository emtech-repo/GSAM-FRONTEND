import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localdata = localStorage.getItem('currentUser')
  if(localdata){    
    return true;
  }
  else{
    router.navigateByUrl('/Authenticate')
    return false;
  }
};

import { CanActivateFn, Router } from '@angular/router';

import { AuthserviceService } from '../services/authservice.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthserviceService);
  const isAuthenticated = authService.isAuthenticated();
  const router = inject(Router);

  if(!isAuthenticated) {
    console.log("Access denied", isAuthenticated)
    router.navigate(['/login']);
  } 

  return true;

};

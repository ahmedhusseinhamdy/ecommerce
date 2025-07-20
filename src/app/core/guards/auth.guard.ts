import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true; // allow navigation
    } else {
      return _Router.parseUrl('/login'); // redirect to login
    }
  }

  return true; // allow SSR navigation
};

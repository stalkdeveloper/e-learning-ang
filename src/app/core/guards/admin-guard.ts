import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState$.pipe(
    take(1),
    map(authState => {
      if (authState.isAuthenticated && authService.canAccessAdminPanel()) {
        return true;
      } else if (authState.isAuthenticated) {
        router.navigate(['/dashboard']);
        return false;
      } else {
        // Not authenticated - redirect to admin login
        router.navigate(['/admin/login']);
        return false;
      }
    })
  );
};
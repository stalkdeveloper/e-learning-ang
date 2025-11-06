import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { LoginComponent } from './features/auth/login/login';
import { UserDashboardComponent } from './features/user/dashboard/dashboard';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  
  /* User dashboard - accessible by both platform and system users */
  { 
    path: 'dashboard', 
    component: UserDashboardComponent,
    canActivate: [authGuard]
  },
  
  /* Admin dashboard - only accessible by system users */
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  
  // Redirect any unknown routes to home
  { path: '**', redirectTo: '' }
];
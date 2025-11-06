import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  authState$ = this.authService.authState$;
  userDisplay$ = this.authService.getUserDisplay();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToAdminLogin(): void {
    this.router.navigate(['/admin/login']);
  }
}
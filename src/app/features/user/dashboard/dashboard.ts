import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class UserDashboardComponent {
  private authService = inject(AuthService);
  
  authState$ = this.authService.authState$;
  
  stats = [
    { label: 'Projects', value: 12, icon: '📁' },
    { label: 'Tasks', value: 24, icon: '✅' },
    { label: 'Messages', value: 8, icon: '💬' },
    { label: 'Notifications', value: 3, icon: '🔔' }
  ];
}
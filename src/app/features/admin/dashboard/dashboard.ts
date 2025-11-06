import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
// Fix the import paths - remove 'Admin' prefix from import names
import { AdminHeaderComponent } from '../components/header/header';
import { AdminSidebarComponent } from '../components/sidebar/sidebar'; 
import { AdminFooterComponent } from '../components/footer/footer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent {
  private authService = inject(AuthService);
  
  authState$ = this.authService.authState$;
  
  adminStats = [
    { label: 'Total Users', value: '1,248', icon: '👥', change: '+12%' },
    { label: 'Active Sessions', value: '89', icon: '🔐', change: '+5%' },
    { label: 'Revenue', value: '$12,489', icon: '💰', change: '+18%' },
    { label: 'System Load', value: '24%', icon: '⚡', change: '-2%' }
  ];

  recentUsers = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2024-01-15' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joinDate: '2024-01-14' },
    { name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', joinDate: '2024-01-13' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', joinDate: '2024-01-12' },
    { name: 'David Brown', email: 'david@example.com', status: 'Active', joinDate: '2024-01-11' }
  ];

  getUserInitials(user: any): string {
    if (!user) return 'AU';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
}
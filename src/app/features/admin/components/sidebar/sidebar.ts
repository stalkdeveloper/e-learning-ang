import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class AdminSidebarComponent {
  menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard', active: true },
    { path: '/admin/users', icon: '👥', label: 'User Management' },
    { path: '/admin/courses', icon: '📚', label: 'Courses' },
    { path: '/admin/payments', icon: '💰', label: 'Payments' },
    { path: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
    { path: '/admin/security', icon: '🔒', label: 'Security' }
  ];
}
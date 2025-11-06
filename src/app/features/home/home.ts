import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  features = [
    {
      title: 'Modern Angular',
      description: 'Built with the latest Angular features and best practices',
      icon: '⚡'
    },
    {
      title: 'Secure Authentication',
      description: 'Role-based access control for users and administrators',
      icon: '🔒'
    },
    {
      title: 'Responsive Design',
      description: 'Beautiful UI that works on all devices',
      icon: '📱'
    }
  ];
}
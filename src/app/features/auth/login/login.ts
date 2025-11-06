import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { environment } from '../../../../environments/environment'; // This imports the correct environment based on build

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm: FormGroup;
  isSystemLogin = false;
  loading = false;
  error = '';

  // Make environment available in template
  readonly environment = environment;

  constructor() {
    // Check if we're on admin login route
    this.isSystemLogin = this.router.url.includes('/admin/login');
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      const credentials = {
        ...this.loginForm.value,
        accountType: this.isSystemLogin ? 'system' : 'platform'
      };

      if (!environment.production || true) {
        this.demoLogin(credentials);
        return;
      }

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            if (response.data.user.accountType === 'system') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.error = response.message || 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  private demoLogin(credentials: any): void {
    setTimeout(() => {
      this.loading = false;
      
      // Demo validation logic
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        // Create demo response for system user
        const demoResponse = {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: 1,
              email: credentials.email,
              firstName: 'Admin',
              lastName: 'User',
              accountType: 'system'
            },
            token: 'demo-token-12345',
            expiresIn: 3600
          }
        };
        
        // Call auth service with demo response
        this.simulateAuthServiceLogin(demoResponse);
        this.router.navigate(['/admin/dashboard']);
        
      } else if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        // Create demo response for platform user
        const demoResponse = {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: 2,
              email: credentials.email,
              firstName: 'Platform',
              lastName: 'User',
              accountType: 'platform'
            },
            token: 'demo-token-67890',
            expiresIn: 3600
          }
        };
        
        this.simulateAuthServiceLogin(demoResponse);
        this.router.navigate(['/dashboard']);
        
      } else {
        this.error = 'Invalid email or password. Use admin@example.com/password for system access or user@example.com/password for platform access.';
      }
    }, 1000);
  }

  private simulateAuthServiceLogin(response: any): void {
    const user = {
      ...response.data.user,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    // Use the auth service to set state properly
    this.authService.setAuthStateDirectly(user, response.data.token);
    
    // Also store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
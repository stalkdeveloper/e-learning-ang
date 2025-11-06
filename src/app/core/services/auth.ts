import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, AuthState } from '../models/auth.model';
import { User, isSystemUser, isPlatformUser, getUserDisplay } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);

  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false
  });

  public authState$ = this.authState.asObservable();

  // Safe localStorage access for SSR
  private get localStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            const user: User = {
              ...response.data.user,
              isActive: true,
              createdAt: new Date().toISOString()
            };
            
            this.setAuthState({
              isAuthenticated: true,
              user,
              token: response.data.token,
              loading: false
            });
            
            // Safe localStorage access
            if (this.localStorage) {
              this.localStorage.setItem('auth_token', response.data.token);
              this.localStorage.setItem('user_data', JSON.stringify(user));
            }
          }
        })
      );
  }

  logout(): void {
    this.setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
    
    // Safe localStorage access
    if (this.localStorage) {
      this.localStorage.removeItem('auth_token');
      this.localStorage.removeItem('user_data');
    }
  }

  autoLogin(): void {
    // Safe localStorage access
    if (!this.localStorage) return;

    const token = this.localStorage.getItem('auth_token');
    const userData = this.localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.setAuthState({
          isAuthenticated: true,
          user,
          token,
          loading: false
        });
      } catch (error) {
        this.logout();
      }
    }
  }

  // Access control methods
  isSystemUser(): boolean {
    return isSystemUser(this.authState.value.user);
  }

  isPlatformUser(): boolean {
    return isPlatformUser(this.authState.value.user);
  }

  canAccessAdminPanel(): boolean {
    return this.isSystemUser();
  }

  canAccessUserPanel(): boolean {
    return this.isPlatformUser() || this.isSystemUser();
  }

  getUserDisplay(): { fullName: string; initials: string } | null {
    const user = this.authState.value.user;
    return user ? getUserDisplay(user) : null;
  }

  setAuthStateDirectly(user: User, token: string): void {
    this.setAuthState({
      isAuthenticated: true,
      user,
      token,
      loading: false
    });
  }

  private setAuthState(state: AuthState): void {
    this.authState.next(state);
  }

  private setLoading(loading: boolean): void {
    this.authState.next({ ...this.authState.value, loading });
  }
}
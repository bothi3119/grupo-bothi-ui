import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Credentials, LoginResponse, UserResponse } from '@app/core/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = environment.apiUrl;
  isAuthenticated = signal(false);
  role = signal<string | null>(null);
  authToken = signal<string | null>(null);
  userData = signal<UserResponse | null>(null);

  constructor() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    if (token) {
      this.isAuthenticated.set(true);
      this.authToken.set(token);
    }
    if (role) {
      this.role.set(role);
    }
  }

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/v1/auth/login`, credentials).pipe(
      tap(({ token, user }) => {
        this.isAuthenticated.set(true);
        this.authToken.set(token);
        this.userData.set(user);
        this.role.set(user.role);
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', user.role);
      })
    );
  }

  logout() {
    this.isAuthenticated.set(false);
    this.authToken.set(null);
    this.userData.set(null);
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}

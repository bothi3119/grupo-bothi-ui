import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = environment.apiUrl;
  isAuthenticated = signal(false);
  authToken = signal<string | null>(null);
  userData = signal<any>(null);

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated.set(true);
      this.authToken.set(token);
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login`, credentials).pipe(
      tap((response: any) => {
        this.isAuthenticated.set(true);
        this.authToken.set(response.token);
        this.userData.set(response.user);
        localStorage.setItem('authToken', response.token);
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

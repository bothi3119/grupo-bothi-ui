import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message, PasswordResponse, ResetPassword, UpdatePassword } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/passwords`;
  private http = inject(HttpClient);

  updatePassword(body: ResetPassword): Observable<PasswordResponse> {
    return this.http.put<PasswordResponse>(`${this.apiUrl}/update`, body);
  }

  resetPassword(body: { email: string }): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/reset`, body);
  }

  updatePasswordWithToken(body: UpdatePassword): Observable<PasswordResponse> {
    return this.http.put<PasswordResponse>(`${this.apiUrl}/update_with_token`, body);
  }
}

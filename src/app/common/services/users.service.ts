import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable, pluck } from 'rxjs';
import { CreateUser, EditUser, User, UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/users`;
  private http = inject(HttpClient);

  loadUsers(text?: string): Observable<User[]> {
    let params = new HttpParams();
    if (text !== undefined) {
      params = params.set('text', text);
    }
    return this.http
      .get<User[]>(this.apiUrl, {
        params,
      })
      .pipe(
        pluck('results'),
        map(data => {
          return data as User[];
        })
      );
  }

  getUser(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`);
  }

  createUser(userData: CreateUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, userData);
  }

  editUser(userData: EditUser, user_id: number): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/${user_id}`, userData);
  }

  activeOrDeactive(user: { active: boolean }, user_id: number): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/${user_id}/active`, user);
  }

  deleteUser(id: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`);
  }
}

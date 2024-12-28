import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected apiUrl = 'https://localhost:7133/api';
  private authService?: AuthService; // Lazy-loaded AuthService

  constructor(
    protected http: HttpClient,
    private injector: Injector // Inject Angular's Injector
  ) {}

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  protected getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  protected put<T>(endpoint: string, id: number, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data, { headers: this.getHeaders() });
  }

  protected delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (!this.authService) {
      this.authService = this.injector.get(AuthService);
      console.log("Auth service is not set");
    }

    if(!this.authService)
      {
        console.log("Still not set");
      }else if(this.authService)
      {
        console.log("auth service is set");
      }

    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}

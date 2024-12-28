import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
    protected apiUrl = 'https://localhost:7133/api';

    constructor(protected http: HttpClient, private authService:AuthService) {}

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {headers: this.getHeaders()});
  }

  protected getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, {headers: this.getHeaders()});
  }

  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, {headers: this.getHeaders()});
  }

  protected put<T>(endpoint: string, id: number, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data, {headers: this.getHeaders()});
  }

  protected delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`, {headers: this.getHeaders()});
  }
    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        if(this.authService.getToken()){
            headers= headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
        }
        return headers;
    }
}
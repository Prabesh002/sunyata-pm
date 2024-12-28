import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';

interface AuthResponse {
  token: string;
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();
  private userRole = new BehaviorSubject<string>(this.getRole());
  userRole$ = this.userRole.asObservable()

    constructor(http: HttpClient) {
      super(http);
    }

  register(username:string, password:string): Observable<any> {
    return this.post<any>('auth/register', {username, password});
  }


  login(username: string, password: string): Observable<AuthResponse> {
      return this.post<AuthResponse>('auth/login', {username,password}).pipe(
          tap((response: AuthResponse) => {
              this.setToken(response.token)
              this.setRole(response.role);
              this.loggedIn.next(true);
          })
      )
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.ROLE_KEY);
      this.loggedIn.next(false);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

    getRole(): string {
        return localStorage.getItem(this.ROLE_KEY) || "user";
    }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
    isAdmin():boolean{
        return localStorage.getItem(this.ROLE_KEY) === "Admin";
    }


  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
    private setRole(role:string):void{
        localStorage.setItem(this.ROLE_KEY, role);
    }
}
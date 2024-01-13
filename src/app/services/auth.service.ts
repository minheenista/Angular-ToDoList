import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Respuesta, Usuario } from '../models/login.model';
import { UserLogin } from '../models/userLogin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = ' https://proyectofinal-cbfg.onrender.com/users';
  private tokenKey = 'jwt';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(userLogin: UserLogin): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.urlApi}/login`, userLogin);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = this.cookieService.get(this.tokenKey);
    return token ? token : null;
  }

  registerUser(userRegister: Usuario): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.urlApi}`, userRegister);
  }

  logout(): void {
    this.cookieService.delete(this.tokenKey, '/', 'localhost');
  }
}

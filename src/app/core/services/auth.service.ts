import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private readonly _Router = inject(Router);
  private readonly _HttpClient = inject(HttpClient);
  userData: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  userId: string = '';
  saveUserData() {
    if (localStorage.getItem('userToken') !== null) {
      let token: any = localStorage.getItem('userToken');
      //npm i jwt decode
      this.userData = jwtDecode(token);
      localStorage.setItem('UserId', this.userData.id);
      this.userId = this.userData.id;
    }
  }
  logout() {
    if (localStorage.getItem('userToken') !== null) {
      localStorage.removeItem('userToken');
      this._Router.navigate(['/login']);
      this.userData = null;
    }
  }

  forgetPsssword(data: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  verifyResetCode(data: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  ResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}

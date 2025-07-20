import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../shard/environement/environement';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: any
  
  constructor(private _HttpClient: HttpClient) { }

  decodeUserToken() {
    if (sessionStorage.getItem('token')) {
     this.userInfo = jwtDecode(sessionStorage.getItem('token')!)
    }
  }
  
  signUp(data: object): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/signin`, data)
  }
   ForgotPassword(userEmail: string): Observable<any> {
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/forgotPasswords`, { "email": userEmail });
  }

  VerifyResetCode(resetCode:string):Observable<any>{
    return this._HttpClient.post(`${environement.baseUrl}/api/v1/auth/verifyResetCode`,{"resetCode":resetCode})
  }

  UpdateLoggedUserPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/users/changeMyPassword`,data,{headers :this.userInfo})
  }

  ResetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  UpdateLoggeduserdata(data:object):Observable<any>{
    return this._HttpClient.put(`${environement.baseUrl}/api/v1/users/updateMe/`,data,{headers :this.userInfo})
  }

}

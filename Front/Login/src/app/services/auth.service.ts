import { Injectable } from '@angular/core';
import {environment} from "../environments/environments"
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../interfaces/loginData';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.API_URL
  token = new BehaviorSubject<string | null>(null);
  isAdmin = new BehaviorSubject<boolean>(false);
  isRegistered = new BehaviorSubject<boolean>(false);
  codigo = new BehaviorSubject<string>("");
  token2 : string = ""
  constructor(private http: HttpClient) {
    this.token.next(localStorage.getItem('token'));

    if (this.token.value != null) 
    {
      const helper = new JwtHelperService();
      this.token2 = this.token.value.toString()
      const decodedToken = helper.decodeToken(this.token2);
      this.codigo.next(decodedToken)
      if (decodedToken != null && decodedToken.isAdmin == true) {
        this.isAdmin.next(true);
        this.isRegistered.next(true);
      } else {
        this.isAdmin.next(false);
        this.isRegistered.next(true);
      }
    } else {
      this.isAdmin.next(false);
      this.isRegistered.next(false);
    } 
    
  }

  login(data:LoginData) {
    this.http.post<any>(this.url +"/auth", data).subscribe(
      (userData) => {
        this.token.next(userData.token);
        const helper = new JwtHelperService();
        this.token2 = this.token.value!.toString()
        const decodedToken = helper.decodeToken(this.token2);
        this.codigo.next(decodedToken)
        if (decodedToken != null && decodedToken.isAdmin == true) {
          this.isAdmin.next(true);
          this.isRegistered.next(true);
        } else {
          this.isAdmin.next(false);
          this.isRegistered.next(true);
        }
        localStorage.setItem('token', userData.token);
        return userData
      },
      (errorData) => {
        throw errorData
      },
    )
  }
}

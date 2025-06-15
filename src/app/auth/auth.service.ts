import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.response.data';



@Injectable({providedIn: 'root'})
export class AuthService {

  private signupUrl = "http://localhost:8080/signup";

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.signupUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}

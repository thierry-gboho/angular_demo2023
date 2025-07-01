import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthResponseData } from './auth.response.data';
import { catchError } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class AuthService {

  private signupUrl = "http://localhost:8080/signup";
  private loginUrl = "http://localhost:8080/connexion";

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.signupUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError)
    )
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(
      this.loginUrl,
      {
        "email": email,
        "password": password,
        "returnSecureToken": true
      }
    ).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = "An unknown error occured";
        if (!errorRes.error || !errorRes.error.detail) {
          return throwError(errorMessage);
        }

        if (errorRes.error.status == 400) {
          if (errorRes.error.instance == "/signup") {
              errorMessage = errorRes.error.detail;
          }
          if (errorRes.error.instance == "/connexion") {
              errorMessage = errorRes.error.detail;
          }
        }
        return throwError(errorMessage);
  }
}

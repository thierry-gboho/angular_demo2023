import { HttpClient } from '@angular/common/http';
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
      catchError(errorRes => {
        /* here we have an HttpErrorResponse. If we console log it we'll get something like
        HttpErrorResponse {
            error: {
              "type": "about:blank",
              "title": "Bad Request",
              "status": 400,
              "detail": "user 'test@yahoo.fr' already exists",
              "instance": "/signup"
            },
            headers: _HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ},
            message: "Http failure response for http://localhost:8080/signup: 400 OK",
            name: "HttpErrorResponse",
            ok: false,
            status: 400,
            statusText: "OK",
            url: "http://localhost:8080/signup"
         }
        */

         let errorMessage = "An unknown error occured";
         if (!errorRes.error || !errorRes.error.detail) {
          return throwError(errorMessage);
         }

         if (errorRes.error.instance == "/signup" && errorRes.error.status == 400) {
            errorMessage = errorRes.error.detail;
          }
          return throwError(errorMessage);

      })
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
      catchError(errorRes => {
        /* here we have an HttpErrorResponse. If we console log it we'll get something like
        HttpErrorResponse {
            error: {
              "type": "about:blank",
              "title": "Bad Request",
              "status": 400,
              "detail": "user 'test@yahoo.fr' already exists",
              "instance": "/signup"
            },
            headers: _HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ},
            message: "Http failure response for http://localhost:8080/signup: 400 OK",
            name: "HttpErrorResponse",
            ok: false,
            status: 400,
            statusText: "OK",
            url: "http://localhost:8080/signup"
         }
        */

         let errorMessage = "An unknown error occured";
         if (!errorRes.error || !errorRes.error.detail) {
          return throwError(errorMessage);
         }

         if (errorRes.error.instance == "/connexion" && errorRes.error.status == 400) {
            errorMessage = errorRes.error.detail;
          }
          return throwError(errorMessage);

      })
    )
  }
}

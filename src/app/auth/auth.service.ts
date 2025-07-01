import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { AuthResponseData } from './auth.response.data';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';



@Injectable({providedIn: 'root'})
export class AuthService {

  private signupUrl = "http://localhost:8080/signup";
  private loginUrl = "http://localhost:8080/connexion";

  // store the user in a subject
  user = new Subject<User>();

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
      catchError(this.handleError),
      tap((responseData: AuthResponseData)  => this.handleAuthentication(responseData.email,
                                                                responseData.localId,
                                                                responseData.idToken,
                                                                +responseData.expiresIn)

      )
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
      catchError(this.handleError),
      tap((responseData: AuthResponseData)  => this.handleAuthentication(responseData.email,
                                                                responseData.localId,
                                                                responseData.idToken,
                                                                +responseData.expiresIn)

      )
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

  // Redirection to a new route once the user is authenticated can be done here in handleAuthentication
  //  or in the auth.component.ts file inside of subscribe
  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
      // generate the expiration date in ms as it is not part of the response and
      // is therfore not in this function input params
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(
          email,
          localId,
          token,
          expirationDate);

        // store the user data using our subject
        this.user.next(user);


  }
}

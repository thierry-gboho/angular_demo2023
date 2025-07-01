import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.response.data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginMode = true;
  loadingInProcess = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {

    console.log(authForm.value);

    if (! authForm.valid) return;

    this.loadingInProcess = true;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.loginMode)
      authObservable = this.authService.login(email, password);
    else
      authObservable = this.authService.signup(email, password);


    authObservable.subscribe(
        responseData => {
          console.log(responseData);
          this.loadingInProcess = false;
        },
        /* Now in the service we extract the filter out the error message */
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.loadingInProcess = false;
        }
    );

    authForm.reset();

  }

}

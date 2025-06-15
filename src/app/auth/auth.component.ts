import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    if (this.loginMode) {
      // TODO
    } else {
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authService.signup(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.loadingInProcess = false;
        },
        error => {
          console.log(error);
          this.error = 'An error occurred!';
          this.loadingInProcess = false;
        }
      );
    }

    authForm.reset();

  }

}

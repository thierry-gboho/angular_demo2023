# Dynamic components

They are components created dynamically at run time. For example you want to show an _alert_, you
want to show a _model_, some _overlay_ whi.ch shooulld only be loaded upon an action. That could be
implemented using dynamic components

Dynamic component is not a specific feature provided by Angular but we can simply add components that we load
through our code. That's exactly what we'll do here. We'll learn 

1. how to create such components
2. how to load it on demand
3. how to communicate with ith
4. how to get rid of it

# The different approaches of loading a component dynamically

A component can be loaded dynamically using _*ngIf_ which controls whether the component is added to the DOM

The alternative would be to use what was called in the past _dynamic component loader_. This was a helper utility that
should not use anymore. With this approach you have to create and add the component to the DOM via your typescript code
```
this include how the component is instanciated, how data is passed into it and how it is removed. In other words everything *ngIf
does for you, you have to do it on your own with this approach
```

# Adding an alert modal component when the user enters wrong credentials (using *ngIf to load it dynamically)

We create our modal component AlertComponent:

The alert.component.ts:
```
import { Component, EventEmitter, Input, Output } from "@angular/core";



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  standalone: false
})
export class AlertComponent {

  @Input()
  message !: string;

  @Output()
  close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}

```

The alert.component.html:
```
<div class="backdrop" (click)="onClose()"></div>
<div class="alert-box">
  <p>{{message}}</p>
  <div class="alert-box-action">
    <button class="btn btn-primary" (click)="onClose()">Close</button>
  </div>
</div>


```

The alert.component.css:
```
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.75);
  z-index: 50;
}

.alert-box {
  position: fixed;
  top: 30vh;
  left: 20vw;
  width: 60vw;
  padding: 16px;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.alert-box-actions {
  text-align: right;
}
```

Then we update our auth.component.html to use the alert component if the credentials are incorrect:

The auth.component.html:
```
<div class="row">
  <div class="col-xs-12 col-md-6 col-md-offset-3">
    <!--div class="alert alert-danger" *ngIf="error">
      <p>{{error}}</p>
    </div-->
    <app-alert [message]="error" *ngIf="error" (close)="closeAlert()"></app-alert>
    <div *ngIf="loadingInProcess" style="text-align: center;">
      <app-loading-spinner></app-loading-spinner>
    </div>
    <form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)"
      *ngIf="!loadingInProcess">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          class="form-control"
          ngModel
          name="email"
          required email
          />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          ngModel
          name="password"
          required minlength="6"
          />
      </div>
      <p class="inline-block-right">
        <button type="submit" class="btn btn-primary width-150 btn-shape-s1"
        [disabled]="!authForm.valid">{{loginMode ? 'Login' : 'Sign Up'}}</button>
      </p>
      <p class="inline-block-right">
        <button type="button" class="btn btn-primary width-150 btn-shape-s1" (click)="onSwitchMode()">
          Switch to {{!loginMode ? 'Login' : 'Sign Up'}}
        </button>
      </p>
    </form>
  </div>
</div>
```

The auth.component.ts:
```
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

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

          // Redirection to a new route once the user is authenticated could also have been done
          //  in the auth.service.ts file inside of handleAuthentication
          this.router.navigate(['/recipes']);
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

  closeAlert() {
    this.error = null;
  }

}
```



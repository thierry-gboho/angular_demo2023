import { take, exhaustMap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from './user.model';


/*
  do not add it with providedIn='root' because we have to provide it so that Angular understands it
*/
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // we need to return an observable but this.suthService.user is also an observable so
    // we use exhaustMap to convert complete the user observable and access it to create our
    // new observable

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {

        if (user == null || user.token == null)
          return next.handle(req); // use the default

        // Clone the request and update it with the token

        /*
         If the token had to be added to the request parameters rather than the header
        const updatedReq = req.clone({params: new HttpParams().set('auth', user!.token)});
        */

        const updatedReq = req.clone(
          {
            setHeaders: { 'Authorization': 'Bearer ' + user!.token }
          });

        /* or eqquivalently
        const updatedReq = req.clone(
          {
            headers: req.headers.set('Authorization', 'Bearer ' + user!.token)
          });
        */

          // in here we can return our new observable
        return next.handle(updatedReq);
      })
    )

  }

}

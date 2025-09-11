import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

@Component({
  standalone: false,
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent {
  count$: Observable<number>;

  /*
  * Instead of subscribing to this observable explicitly and then
  * unsubscribing from it in the ngOnDestroy we'll use the async pipe
  * in the html which will automatically do the subscribing and unsubscribing
  * for us
  *
  */
  constructor(private store: Store<{counter: number}>) {
    this.count$ = store.select('counter');
  }


}

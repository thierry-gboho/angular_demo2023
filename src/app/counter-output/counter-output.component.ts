import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  standalone: true,
  imports: [AsyncPipe]
})
export class CounterOutputComponent {
  count$: Observable<number>;

  /*
  * Instead of subscribing to this observable explicitly and then
  * unsubscribing from it in the ngOnDestroy we'll use the async pipe
  * in the html which will automatically do the subscribing and unsubscribing
  * for us
  *
  * Notice that to be able to use the async pipe we had to add
  * the AsyncPipe in the imports array as
  * we are using standalone component
  */
  constructor(private store: Store<{counter: number}>) {
    this.count$ = store.select('counter');
  }
}

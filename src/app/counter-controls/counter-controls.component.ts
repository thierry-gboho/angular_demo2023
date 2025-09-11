import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { increment } from '../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
  standalone: true,
})
export class CounterControlsComponent {
  constructor(private store: Store) {}

  increment() {
    /*
    * Dispatch the increment action defined in ../store/counter.actions
    * Notice that an action is actually a function and the dispatch method
    * takes as argument the executed function:
    * We DO NOT write
    *         this.store.dispatch(increment);
    * but
    *         this.store.dispatch(increment());
    *
    * so that it is executed when dispatching
    */
    this.store.dispatch(increment());
  }

  decrement() {

  }
}

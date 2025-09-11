import { createReducer } from "@ngrx/store";

/*
* The initial state can be a boolean, a number, an object etc...
* For our counter our initial state is the number 0
*/
const initialState = 0;

/*
* A reducer is created with at least one parameter: the initial state
* Here we create a simple reducer for our counter.
* It's not too useful yet because it does not contain the logic to modify
* our state (i.e. the logic to increment our counter)
*/
export const counterReducer = createReducer(
  initialState
);

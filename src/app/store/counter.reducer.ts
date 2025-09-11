import { createReducer } from "@ngrx/store";

/*
* The initial state can be a boolean, a number, an object etc...
* For our counter our initial state is the number 0
*/
const initialState = 0;

/*
*
* Here we create a simple reducer for our counter.
* It's not too useful yet because it does not contain the logic to modify
* our state (i.e. the logic to increment our counter)
*
* counterReducer and counterReducerV2 are identical and for now look quite similar
* but we'll see some difference later when we'll start adding some logic to the
* reducer
*/

/*
* A reducer is created with at least one parameter: the initial state
*/
export const counterReducer = createReducer(
  initialState
);


/*
* The alternative approach to create a reducer is to define a function
* which takes as first parameter the current state and returns the updated state
* 1. This approach works in all versions of NgRx
* 2. we set the default value of the state to be the initial state as the first
*    time this function is called there is no state. As a result, the first time
*    this function is called it returns the initial state
*/
export function counterReducerV2(state = initialState) {
  return state;
}

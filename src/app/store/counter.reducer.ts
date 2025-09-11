import { createReducer, on } from "@ngrx/store";
import { increment } from "./counter.actions";

/*
* The initial state can be a boolean, a number, an object etc...
* For our counter our initial state is the number 0
*/
const initialState = 0;

/*
* A reducer is created with at least one parameter: the initial state
*
* We pass a second argument to createReducer to make it listen to an action
* This second argument uses the on(action, updateLogicArrowFunction) method
*/
export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    /*
    * the logic that updates the state is defined here
    * NOTE: You should not directly mutate a state if it is an object or an array
    * but create a new one
    */
    return state + 1;
  })
);


/*
* Define the actions that can be dispatched
*/

import { createAction } from "@ngrx/store";

/**
 * createAction requires at least one argument which is a unique identifier
 * for your action.
 * By convention this identifier is prefixed with [Key]. For exemple
 * with the key Counter and identifier description Increment we use as unique identifier
 * '[Counter] Increment'
 *
 * Now it's the reducer which should listen to the action so we have to update
 * our counterReducer action to listen to our action (see counter.reducer.ts)
 */
export const increment = createAction(
  '[Counter] Increment'
);

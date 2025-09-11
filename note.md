# Angular state management using NgRx

## Introduction

_NgRx_ is _state management solution_ used for complex application-wide system. 
It may be used insteadd of managing complex state in components or services

It works around four main concepts:

1. State
2. Reducers
3. Selectors
4. Effects

## Uderstanding NgRx and its building blocks

Once you have NgRx installed in your project you can and you _should_ create a _store_


### Store

A store is a _Data/State_ store which is where your data will be _stored_ and _managed_ by NgRx


Your components can:
1. reach out to the store to _read_ the state data
2. listen to data _changes_ so that the component can update the UI as data changes in the store

### Extracting Data from the store: Selectors

A _Selector_ is an NgRx feature used for _reading_ and _extracting_ data from the Store. 
That is, using _Selectors_ your component can _read/extract_ the data in the _store_

### Changing/Updating Data in the Store: Actions and Reducers

#### Action

To update data in the Store, your component needs to _dispatch actions_ which describe the changes to be performed and
add any extra data that might be needed for those changes

#### Reducers

Those _dispatched actions_ are picked up by the so-called _reducers_ which you define as part of setting up the state management system.
A _reducer_ contains the _actual logic for updating/changing the store data

#### Effects

Effects are simply _side effects_ that should be triggered for certain actions. For exemple, an HTTP request to the backend that should also be triggered when certain actions are dispatched.

#### The big picture

```
An Action is a Standardized message ("events") to which reducers listen

A Reducer contains State changing logic (e.g. increment a counter by 1)

An effect is a secondary/side effect triggered for certain actions like sending an HTTP request
```

![NgRx Building Blocks](images/ngrx-buildingBlocks.png)


## Installing NgRx

  In the system terminal use the command:

```
  ng add @ngrx/store
```

This will install NgRx in the projecct and update your AppModule by adding in the imports array
_StoreModule.forRoot({}, {})_ where _StoreModule is imported from _@ngrx/store_

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterControlsComponent,
  ],
  imports: [BrowserModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

### Note

_StoreModule.forRoot({}, {})_ is the line of code that's responsible for setting up a _store_ in the application.

## Adding a first reducer and store setup

#### Introduction

To get data into the store we need a reducer because _reducers_ are the things that change data in the store

```
A reducer is used to set up initial data in the store and potentially change it over time
```

#### Adding a directory store to the application

We create the _app/store_ direcctory where we'll keep NgRx specific files 

#### Create a first reducer _app/store/counter.reducer.ts_

```
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
```

#### Connect the reducer to our store

We connect the reducer to our store by modifying the store setup (i.e. the line _StoreModule.forRoot({}, {})_) in our app.module.ts

The _StoreModule.forRoot({}, {})_ takes in as first parameter an _object_ that associates a _key_ of your choice to the corresponding _reducer_


```
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterControlsComponent,
  ],
  imports: [BrowserModule, StoreModule.forRoot({
    counter: counterReducer
  }, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

If we had another reducer, say _authReducer_ we'd connect it to the store using a key like _auth_:

```
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
import { authReducer } from './store/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterControlsComponent,
  ],
  imports: [BrowserModule, StoreModule.forRoot({
    counter: counterReducer,
    auth: authReducer
  }, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## An alternative way of creating a reducer

As we saw, creating a reducer is quite simple. You just have to execute the _createReducer()_ function which is provided by NgRx store:

```
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
```

Now it can be interesting to take a look under the hood of what _createReducer()_ to see what's really happening and how we can create a reducer in _older version of NgRx where createReducer() is not provided_.

In this alternative approach you create your reducer manually by defining a function that takes in a first parameter the _current state_ and returns the _updated state_

```
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
```




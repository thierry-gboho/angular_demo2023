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

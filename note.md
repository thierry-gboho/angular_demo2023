Important: FormsModule is Required for Two-Way-Binding!

Important: For Two-Way-Binding (covered in the next lecture) to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.

You then also need to add the import from @angular/forms  in the app.module.ts file:

import { FormsModule } from '@angular/forms'; 


# Creating a New App Correctly

MUST READ

In the next lecture, we set up the course project.

Make sure, you do create that app by also adding the --no-strict, --routing false and --standalone false flags to the ng new command - otherwise you will run into issues later on (we'll still dive into that "Strict Mode" later in the course of course, no worries)!

We'll also install the Bootstrap CSS Framework and in this course, we use version 3 of the framework. Install it via npm install --save bootstrap@3  => The @3  is important!

Additionally, when using a project created with Angular CLI 6+ (check via ng v ), you'll have an angular.json  file instead of an .angular-cli.json  file. In that file, you still need to add Bootstrap to the styles[]  array as shown in the next video, but the path should be node_modules/bootstrap/dist/css/bootstrap.min.css , NOT ../node_modules/bootstrap/dist/css/bootstrap.min.css . The leading ../  must not be included.

Also see this lecture - I do show the complete setup process there: https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655614/

If you're facing any problems, please have a look at this very thorough thread by Jost: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/17862130#questions/10444944

# install bootstap

Using npm to automatically iinstall bootstrap
```
npm install --save bootstap
```

Then we need to inform the CLI about bootstrap. To do so edit angular.json and add the path to
our bootstrap css file:
"node_modules/bootstrap/dist/css/bootstrap.min.css" in the styles array:

```
...
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/angular_demo2023",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
                "src/favicon.ico",
                "src/assets"
            ],
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
```

Then to check if bootstrap is working we can modify our app.component.html as follows:

```
<div class="container">
    <div class="row">
        <div class="col-md-12">
            I'm working
        </div>
    </div>
</div>
```

then run the application and check the style from the web-developper tools.


# roaddmap

HeaderComponent (navigation)

ShoppingListComponent         
ShoppingEditComponent      

RecipesComponent 
RecipeListComponent
RecipeDetailComponent
RecipeItemComponent


First we create the HeaderComponent manually and update the _declarations_ array in the app.module

Then we create the other components using Angular CLI:
```
ng g c recipes
ng g c recipes/recipe-list
ng g c recipes/recipe-detail
ng g c recipes/recipe-list/recipe-item

ng g c shopping-list
ng g c shopping-list/shopping-edit
```

make this component not standalone (i.e. remove the lines standalone: true and imports from these components ts)
Finally update the _declarations_ array (i.e. declare the created components in that array)

# shortcuts

use
 
```
nav.navbar.navbar-default
```
to generate

```
<nav class="navbar navbar-default">
    
</nav>
```

# Our nav bar in header.component.html

Use the css class _caret_ for the arrow pointing downwards on most list boxes.

```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#">Recipes</a></li>
                <li><a href="#">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

# Alternative Non-Collapsable Navigation Bar

The way we added it, the Navbar will collapse on smaller screens. Since we didn't implement a Hamburger menu, that means that there's no way of accessing our links on smaller screens.

You can either add such a menu on your own (see below), or you replace collapse navbar-collapse  with just navbar-default.

Adding a Hamburger Menu:

Alternatively, if you want to make the navigation bar responsive, please replace these lines in header.component.html:

    <div class="navbar-header">
      <a routerLink="/" class="navbar-brand">Recipe Book</a>
    </div>
    <div class="collapse navbar-collapse">

with these lines:

    <div class="navbar-header">
      <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
    	<span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
      </button>
      <a routerLink="/" class="navbar-brand">Recipe Book</a>
    </div>
    <div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed = true">

and add this line to header.component.ts:

    collapsed = true;

# Outputting a list of recipes with NgFor

We add a recipe model which contains the recipe _name_, _description_, and _image path_. This class
is defined in _app/recipes/recipe.model.ts_

```
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
```

Then we use this model to ouptut a list of recipes in the RecipeListComponent:
The recipe-list.component.ts is as follows:
`import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipes = [
      new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg'),
      new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg')
    ];
  }

}

```

The corresponding template is:
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <a href="#" class="list-group-item clearfix" *ngFor="let recipe of recipes">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img [src]="recipe.imagePath"
             alt="{{recipe.name}}"
             class="img-responsive"
             style="max-height: 50px;" />
      </span>
    </a>
    <app-recipe-item></app-recipe-item>
  </div>
</div>
```

Notice that We use _property binding_ for the _src_ attribute.

# Displaying Recipe details

We use bootstrap to update the _recipe-detail.component.html_.

```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img src="" alt="" class="img-responsive">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>Recipe Name</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group">
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a href="#">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    Description
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>

```

# Creating the Ingredient model

We can either explicitly define the properties as we did for the RecipeModel:

```
export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
```

or add the accessors in the constructor with an empty body and get exactly the same behaviour (i.e. The properties
are now declared in the list of parameters of the constructor)
```
export class Ingredient {
  constructor(public name: string, public amount: number) {}
}
```

# Displaying the ingredient list

To display the ingredient list, we update the _shopping-list.component.ts_ file:


```
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ]
  }

}

```

and _shopping-list.component.html_  file:

```
<div class="row">
    <div class="col-xs-10">
        <app-shopping-edit></app-shopping-edit>

        <hr />
        <ul class="list-group">
          <a class="list-group-item"
            style="cursor: pointer"
            *ngFor="let ingredient of ingredients">
            {{ingredient.name}} ({{ingredient.amount}})
          </a>
        </ul>
    </div>
</div>
```

# Adding the shopping list edit section

We update the shopping-edit.component.html by adding 
1. the _name_ input text
2. the _amount_ input number
3. the buttons add/delete/clear

```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <!-- column spanning a width of 5. On small devices it should span the whole width -->
         <div class="col-sm-5 form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" />
         </div>

         <!-- column spanning a width of 2 -->
         <div class="col-sm-2 form-group">
            <label for="amount">Amount</label>
            <input type="number" id="amount" class="form-control" />
         </div>


         <div class="row">
             <!-- col spanning the whole width -->
            <div class="col-xs-12">
                <!--
                    btn-succes:  green
                    btn--danger: red
                    btn-primary: blue
                -->
                <button type="submit" class="btn btn-success">Add</button>
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="reset" class="btn btn-primary">Clear</button>
            </div>
         </div>
      </div>
    </form>
  </div>
</div>
```
# Adding navigation with event binding and NgIf

We hook up navigation to either load _recipes_ or the _shopping list_. In this section we shall use
_event binding_ and _NgIf_ to do this. Later we'll do this with _routing_ as this is the way it is meant
to be done. But the solution we'll use now also is very creative and not bad.

We add the click event on the buttons in the header.component.html so that they emit either the string _recipes_ or _shoppingList_

```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#" (click)="onSelect('recipes')">Recipes</a></li>
                <li><a href="#" (click)="onSelect('shoppingList')">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```
The corresponding ts file contains the event emitter as Output:
```
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output()
  featureSelected = new EventEmitter<string>();

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

}

```

Finally in the app.component.html we add a listener on the event output by the the HeaderComponent

1. The reception of the event triggers the _onNavigate_ method which updates the _loadedFeature_ property)
2. We use NgIf to display either the RecipesComponent or the ShoppingListComponent 

```
<app-header (featureSelected)="onNavigate($event)"></app-header>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <app-recipes *ngIf="loadedFeature === 'recipes'; else elseBlock"></app-recipes>
            <ng-template #elseBlock>
              <app-shopping-list></app-shopping-list>
            </ng-template>

        </div>

    </div>
</div>
```

The updated app.component.ts file is as follows:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedFeature = 'recipes';

  onNavigate(featureSelected: string) {
    this.loadedFeature = featureSelected;
  }
}

```

# Passing data with envent and property binding from a child component to a grand-parent component

```
                      RecipesComponent
                              |
                              |
          ____________________|__________________
          |                                      |
      RecipeListComponent                    RecipeDetailComponent
          |
          |
     RecipeItemComponent

```

a click on a _RecipeItemComponent_ emits an event _recipeSelected_ to its parent the _RecipeList_ component.

The recipe-item.component.html:

```
<a href="#" class="list-group-item clearfix"
  (click)="onSelected()">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>

```

The recipe-item.component.ts:

```
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input({required:true})
  recipe !: Recipe;

  @Output()
  recipeSelected = new EventEmitter<void>();

  onSelected(): void {
    this.recipeSelected.emit();
  }

}
```

When the RecipeList receives the _recipeSelected()_ event, it emits an event _selectedRecipeEvt_
which conains the _recipe_ selected to its parent the RecipesComponent

The recipe-list.component.html:

```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item [recipe]="recipeItem" *ngFor="let recipeItem of recipes"
      (recipeSelected)="onSelectRecipe(recipeItem)"></app-recipe-item>
  </div>
</div>

```

The recipe-list.component.ts:

```
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  @Output()
  selectedRecipeEvt = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.recipes = [
      new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg'),
      new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg')
    ];
  }

  onSelectRecipe(recipe: Recipe): void  {
    this.selectedRecipeEvt.emit(recipe);
  }

}
```

The RecipesComponent listens to the _selectedRecipeEvt_ emitted by its child component RecipeListComponent
and updates its _selectedRecipe_ when this event is received, then it passes this _selectedRecipe_ to
second child the RecipeDetailComponent.

The recipes.component.html:

```
<div class="row">
    <div class="col-md-5">
        <app-recipe-list
        (selectedRecipeEvt)="selectedRecipe = $event"></app-recipe-list>
    </div>
    <div class="col-md-7">
        <app-recipe-detail *ngIf="selectedRecipe; else elseBlock"
          [recipe]="selectedRecipe"></app-recipe-detail>
        <ng-template #elseBlock>
          <p>Please select a recipe</p>
        </ng-template>
    </div>
</div>
```

The recipes.component.ts:

```
import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  selectedRecipe?: Recipe;

}

```

The recipe-detail.component.html:

```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img [src]="recipe.imagePath"
        alt="{{recipe.description}}" class="img-responsive"
        style="max-height: 300px">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>{{recipe.name}}</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group">
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a href="#">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    {{recipe.description}}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>

```

The recipe-detail.component.ts:

```
import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input({required: true})
  recipe!: Recipe;


}

```

# Allowing the user to add ingredients to the shopping list

Let's use _template variable_ to pass the data input by the user to the ShoppingEditComponent using
the @ViewChild:

## The ShoppingEditComponent

shopping-edit.component.html

```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <!-- column spanning a width of 5. On small devices it should span the whole width -->
         <div class="col-sm-5 form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control"
                    #nameInput />

         </div>

         <!-- column spanning a width of 2 -->
         <div class="col-sm-2 form-group">
            <label for="amount">Amount</label>
            <input type="number" id="amount" class="form-control"
                  #amountInput />
         </div>


         <div class="row">
             <!-- col spanning the whole width -->
            <div class="col-xs-12">
                <!--
                    btn-succes:  green
                    btn--danger: red
                    btn-primary: blue
                -->
                <button type="submit" class="btn btn-success" (click)="onAddItem()">Add</button>
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="reset" class="btn btn-primary">Clear</button>
            </div>
         </div>
      </div>
    </form>
  </div>
</div>

```

shopping-edit.component.ts

```
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  nameInputRef?: ElementRef;

  @ViewChild('amountInput')
  amountInputRef?: ElementRef;

  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();


  onAddItem(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.ingredientAdded.emit(ingredient);
  }


}
```

## Alternative ShoppingEditComponent by passing the template variable in the click event

```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <!-- column spanning a width of 5. On small devices it should span the whole width -->
         <div class="col-sm-5 form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control"
                    #nameInput />

         </div>

         <!-- column spanning a width of 2 -->
         <div class="col-sm-2 form-group">
            <label for="amount">Amount</label>
            <input type="number" id="amount" class="form-control"
                  #amountInput />
         </div>


         <div class="row">
             <!-- col spanning the whole width -->
            <div class="col-xs-12">
                <!--
                    btn-succes:  green
                    btn--danger: red
                    btn-primary: blue
                -->
                <button type="submit" class="btn btn-success" 
                  (click)="onAddItem(nameInputRef, amountInputRef)">Add</button>
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="reset" class="btn btn-primary">Clear</button>
            </div>
         </div>
      </div>
    </form>
  </div>
</div>

```

```
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(nameInputRef: ElementRef | undefined, amountInputRef: ElementRef | undefined) {
    const name = nameInputRef?.nativeElement.value;
    const amount = amountInputRef?.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.ingredientAdded.emit(ingredient);
  }
}
```

## The ShoppingListComponent

We update the ShoppingListComponent to listen to the _ingredientAdded_ event so that it
updates the list of ingredients when it receives that event.

the shopping-list.component.html:
```
<div class="row">
    <div class="col-xs-10">
        <app-shopping-edit
          (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>

        <hr />
        <ul class="list-group">
          <a class="list-group-item"
            style="cursor: pointer"
            *ngFor="let ingredient of ingredients">
            {{ingredient.name}} ({{ingredient.amount}})
          </a>
        </ul>
    </div>
</div>
```

The shopping-list.component.ts:
```
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ]
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
```

# Building and using a dropdown directive

The idea is to create a directive so that when clicking the button in the following html:
```
<!-- create a dropdown using bootstrap -->
    <div class="btn-group">
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a href="#">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
```

  we add the css class _open_ and get:
  ```
  <!-- create a dropdown using bootstrap -->
    <div class="btn-group open">
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a href="#">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
  ```
  another click will remove the css class _open_ and so on. This will open the dropdown when
  we click on the button.

## The dropdown directive

```
import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // the css class open is attached if opened is true else it is not attached to the tag element
  @HostBinding('class.open')
  opened = false;

  // listen to the click event on the host element to update the opened property
  @HostListener('click')
  toggleOpen() {
    this.opened = !this.opened;
  }

}
```

## The updated code

We add the _DropdownDirective_ to the _declarations_ array of our AppModule:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

We update our dropdowns in the headerComponent and recipeDetailComponent templates:

header.component.html:
```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#" (click)="onSelect('recipes')">Recipes</a></li>
                <li><a href="#" (click)="onSelect('shoppingList')">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" appDropdown>
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

```

recipe-detail.component.html
```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img [src]="recipe.imagePath"
        alt="{{recipe.description}}" class="img-responsive"
        style="max-height: 300px">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>{{recipe.name}}</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group" appDropdown>
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a href="#">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    {{recipe.description}}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>

```

## Closing the dropdown anywhere

If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):

    import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
     
    @Directive({
      selector: '[appDropdown]'
    })
    export class DropdownDirective {
      @HostBinding('class.open') isOpen = false;
      @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
      constructor(private elRef: ElementRef) {}
    }

# Adding the RecipesService

We replace the chained output events from _RecipeItemComponent_ --> _RecipeListComponent_ --> _RecipesComponent_ using:

1. an event emitter in the _RecipesService_ which emits the selected recipe when we click on the _RecipeItemComponent_
2. a subscription to the event emitter is done in the ngOnInit of the RecipesComponent

## The RecipesService

```
import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";


export class RecipesService {
  onSelectRecipeEvt = new EventEmitter<Recipe>();
  selectedRecipe?: Recipe;

  private recipes: Recipe[] = [
    new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg'),
    new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg')
  ];

  public getRecipes() {
    // return a copy
    return this.recipes.slice();
  }
}
```

## The RecipeItemComponent

recipe-item.component.html
```
import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";


export class RecipesService {
  onSelectRecipeEvt = new EventEmitter<Recipe>();
  selectedRecipe?: Recipe;

  private recipes: Recipe[] = [
    new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg'),
    new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg')
  ];

  public getRecipes() {
    // return a copy
    return this.recipes.slice();
  }
}
```

recipe-item.component.ts
```
import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input({required:true})
  recipe !: Recipe;

  constructor(private recipesService: RecipesService) {}

  onSelected(): void {
    this.recipesService.onSelectRecipeEvt.emit(this.recipe);
  }

}
```

## The RecipeListCoomponent

recipe-list.component.html
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item [recipe]="recipeItem" *ngFor="let recipeItem of recipes"></app-recipe-item>
  </div>
</div>
```

recipe-list.component.ts
```
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  constructor(private recipesService: RecipesService) {}

  public get recipes() {
    return this.recipesService.getRecipes();
  }

  ngOnInit(): void {
  }

}
```

## The RecipesComponent

recipes.component.html
```
<div class="row">
    <div class="col-md-5">
        <app-recipe-list></app-recipe-list>
    </div>
    <div class="col-md-7">
        <app-recipe-detail *ngIf="selectedRecipe; else elseBlock"
          [recipe]="selectedRecipe"></app-recipe-detail>
        <ng-template #elseBlock>
          <p>Please select a recipe</p>
        </ng-template>
    </div>
</div>
```

recipes.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe?: Recipe;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    // subscribe to the event emitter
    this.recipesService.onSelectRecipeEvt.subscribe(
      (recipe) => this.selectedRecipe = recipe
    );
  }

}
```

# Adding the ShoppingListService

## The ShoppingListService

```
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}

```

## Providing the service in the application root

We provide this service in the AppModule as it will be used another service later.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
## The ShoppingEditComponent

```
import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  nameInputRef?: ElementRef;

  @ViewChild('amountInput')
  amountInputRef?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(ingredient);
  }

}
```

## The ShoppingListComponent (A first approach with a display bug)

The ShoppingListService:
```
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
```

The ShoppingListComponent:
```
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  ingredients!: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}
```

When we add a new ingredient, it is not displayed in the UI because the _ingredients_  
in the ShoppingListComponent always point to the _same_ array it was initialized with
in ngOnInit which is different from the one used by the service because the service _getIngredients_ returns a _copy_ of the service _ingredients_ array


## The ShoppingListComponent (A second approach solving the display bug)

A solution to the previous bug would be to return the service array rather that a copy
in its _getIngredients_:

```
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients; // return the shopping list array
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
```

## The ShoppingListComponent (A third approach solving the display bug)

This time 
1. we use a _getter_ in our ShoppingListComponent which calls the _getIngredients_ of the service
2. the getIngredients from the service returns a copy of its _ingredients_ array

The ShoppingListService:
```
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
```

The ShoppingListComponent:
```
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
  }

  get ingredients(): Ingredient[] {
    return this.shoppingListService.getIngredients();
  }
}
```
## The ShoppingListComponent (A fourth approach solving the display bug)

This time 
1. we use a _event emitter_ in our ShoppingListService to emit a copy of the updated array
2. the ShoppingListComponent now subscribes to that event emitter to update its _ingredients_ array

The ShoppingListService:
```
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
```

# Passing ingredients from the Recipes to the Shopping List (via a service)

We update the RecipesService so that we can inject the ShoppingListService into that service. The
idea is that when we click on the dropdown menu _To Shopping List_ in the RecipeDetailComponent template,
we add the _selected recipe ingredients_ to the shopping list

## The RecipesService

```
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

// add @Injectable to be able to inject a service into this service
// we want to inject the ShoppingListService into this service
@Injectable()
export class RecipesService {
  onSelectRecipeEvt = new EventEmitter<Recipe>();
  selectedRecipe?: Recipe;

  private recipes: Recipe[] = [
    new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg',
      [new Ingredient('Meat', 1),
        new Ingredient('Tomatoe', 3)
      ]
    ),
    new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('Tomatoe', 5),
        new Ingredient('Onion', 2)
      ]
    )
  ];


  constructor(private shoppingListService: ShoppingListService ){}

  public getRecipes() {
    return this.recipes.slice(); // return a copy
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}

```

## The ShoppingListService

We add the method _addIngredients_ to add multiple ingredients to the shopping list:

```
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

  updatedIngredientsEvt = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updatedIngredientsEvt.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    /**
     * This is a viable option but it will emit a lot of events. It won't be bad
     * because even a recipe with 30 ingredients won't blow up our app but still there are
     * lots of unecessary event emissions. So even though it's a viable option, we'll comment
     * it out
     */
    // for (let Ingredient of this.ingredients) {
    //  this.addIngredient(Ingredient);
    // }

    /*
    * A different and better option would be to directly add all our ingredients in one go
    * and then emit our event.
    *
    * We use the spread operator to push all our ingredients to the ingredients array
    * That is, we use the fact that push can take a list of values. For exemple
    * myNumberArray.push(3, 5, 7);
    */
    this.ingredients.push(...ingredients);

    // emit the event
    this.updatedIngredientsEvt.emit(this.ingredients.slice());
  }

}
```

## The RecipeDetailComponent

recipe-detail.component.ts:
```
import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input({required: true})
  recipe!: Recipe;

  constructor(private recipesService: RecipesService) {}

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
```

recipe-detail.component.html:
```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img [src]="recipe.imagePath"
        alt="{{recipe.description}}" class="img-responsive"
        style="max-height: 300px">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>{{recipe.name}}</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group" appDropdown>
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a (click)="onAddToShoppingList()">To Shopping List</a>
        </li>
        <li>
          <a href="#">Edit Recipe</a>
        </li>
        <li>
          <a href="#">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    {{recipe.description}}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let ingredient of recipe.ingredients">
        {{ingredient.name}}: {{ingredient.amount}}
      </li>
    </ul>
  </div>
</div>

```
# Setting up routes

We add the _app-routing.module.ts_ to configure our routes. That module is then imported
into _app.module.ts_

## The app-routing.module.ts

```
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {
    // the route that is loaded when we first visit the page
    path: '', redirectTo: '/recipes', pathMatch: "full"
  },
  {
    path: 'recipes', component: RecipesComponent
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)  // configure the router
  ],
  exports: [
    RouterModule // make the router available to the parent module (i.e. AppModule)
  ]
})
export class AppRoutingModule {

}

```

_Note:_ We have to add _pathMatch: "full"_ to the default path to make sure that redirection
only occurs when the _empty string_ matches the _full path_. The default setting for pathMatch is
_prefix_ (i.e. matches if the path begins with the specified string)

## The app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## The app.component.html

```
<app-header (featureSelected)="onNavigate($event)"></app-header>
<div class="container">
    <div class="row">
        <div class="col-md-12">
          <router-outlet></router-outlet>
        </div>

    </div>
</div>
```

When the application first starts it redirects to http://localhost:4200/recipes
You can then enter the url http://localhost:4200/shopping-list to go to the Shopping list

# Cleanup before adding navigation to the App

## The HeaderComponent

Let's consider the header.component.html:
```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#" (click)="onSelect('recipes')">Recipes</a></li>
                <li><a href="#" (click)="onSelect('shoppingList')">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" appDropdown>
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

We no longer need the _click_ listeners so our _li_ tag becomes:
```
<li><a href="#">Recipes</a></li>
<li><a href="#">Shopping List</a></li>
```

We don't need the _href="#"_ in these _a_ tags as when present, a click on the link will
send a request to the server and reload the page. Our _li_ tags reduce to:
```
<li><a>Recipes</a></li>
<li><a>Shopping List</a></li>
```

We remove the Output _featureSelected_ and the method _onSelect_ from Our header.component.ts.

The updated header.component.ts:
```
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

}
```

The updated header.component.html:
```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a>Recipes</a></li>
                <li><a>Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" appDropdown>
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

```

## The AppComponent

We remove the property _loadedFeature_ and the method _onNavigate_ from app.component.ts:
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
```

The line
```
<app-header (featureSelected)="onNavigate($event)"></app-header>
```
becomes
```
<app-header></app-header>
```

Our updated app.component.html:
```
<app-header></app-header>
<div class="container">
    <div class="row">
        <div class="col-md-12">
          <router-outlet></router-outlet>
        </div>

    </div>
</div>
```
# Adding navigation to the App using _routerLink="path"_ on the _a_ tag element

## The header.component.html

Use the _routerLink="path"_ on the link to define the link url and hence implement the navigation

Our update header.component.html
```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a routerLink="/recipes">Recipes</a></li>
                <li><a routerLink="/shopping-list">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" appDropdown>
                    <a href="#" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Save Data</a></li>
                        <li><a href="#">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

## Note

The _routerLink_ can be used following the syntaxes:

```
<a [routerLink]="['/user/bob']">Link To user component</a>

<a routerLink="/user/bob">Link To user component</a>
```

The first syntax allows for dynamic parameters in the path. The right hand side
of the expression is actually an array of path segments. For exemple, a link to
_/team/${teamId}/user/${userName}/${details ? true : false}_ is given as:
```
<a [routerLink]="['/team', teamId, 'user', userName, {details: true}]">Link To user component</a>
```

The first segment name can be prepended with _/_, _./_ or _../_
1. If the first segment begins with '/', the router looks up the route from the root of the app
2. If the first segment begins with './', or does not begin with a slash, the router looks in the children of the current activated route
3. If the first segment begins with '../', the router goes up one level in the route tree

Now clicking _Recipes_ or _Shopping List_ in the navigation bar allows us to navigate to the right
page.

# Marking active routes

The css class we need to add/remove is the _active_ class from bootstrap. We use _routerLinkActive="theClassWeWantToCOnditionalllyAddWhenActive"_

our updated header.component.html:
```
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li routerLinkActive="active"><a routerLink="/recipes" style="cursor: pointer;">Recipes</a></li>
                <li routerLinkActive="active"><a routerLink="/shopping-list" style="cursor: pointer;">Shopping List</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" appDropdown>
                    <a style="cursor: pointer;" class="dopdown-toggle" role="button">Manage <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a style="cursor: pointer;">Save Data</a></li>
                        <li><a style="cursor: pointer;">Fetch Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

Notice that _routerLinkActive_ is placed on the _li_ element wrapping the _a_ tag.


## Fixing the link when selecting a recipe

The current RecipeItemComponent has the following template:
```
<a href="#" class="list-group-item clearfix"
  (click)="onSelected()">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>
```

The _href="#"_ makes the click on the link reload the page so that we don't see the selected item
displayed. We fix this by removing this _href="#"_ element. Our updated template is:
```
<a class="list-group-item clearfix"
  (click)="onSelected()"
  style="cursor: pointer;">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>

```

Now clicking on a recipe displays the recipe on the right.

## Fixing other link where we reload the page

We remove the _href="#"_ in other component templates.

# Adding child routing

## Create the default detail component for the url http://localhost:4200/recipes/

We define the child component to be displayed when the user has not selected a recipe yet.

Its template recipe-start.component.html:
```
<h3>Please select a recipe</h3>
```

## Add the child routing definition in the app-routing.module.ts

```
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

const appRoutes: Routes = [
  {
    // the route that is loaded when we first visit the page
    path: '', redirectTo: '/recipes', pathMatch: "full"
  },
  {
    path: 'recipes', component: RecipesComponent,
    children: [
      {
        // detail component to load for the url http://localhost:4200/recipes/
        path: '', component: RecipeStartComponent
      },
      {
        // component to load for the url http://localhost:4200/recipes/${id}
        path: ':id', component: RecipeDetailComponent
      }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)  // configure the router
  ],
  exports: [
    RouterModule // make the router available to the parent module (i.e. AppModule)
  ]
})
export class AppRoutingModule {

}
```

## Add the router-outlet where the child component is supposed to be displayed

In recipes.component.html we replace
```
<div class="row">
    <div class="col-md-5">
        <app-recipe-list></app-recipe-list>
    </div>
    <div class="col-md-7">
        <app-recipe-detail *ngIf="selectedRecipe; else elseBlock"
          [recipe]="selectedRecipe"></app-recipe-detail>
        <ng-template #elseBlock>
          <p>Please select a recipe</p>
        </ng-template>
    </div>
</div>
```

with 

```
<div class="row">
    <div class="col-md-5">
        <app-recipe-list></app-recipe-list>
    </div>
    <div class="col-md-7">
        <router-outlet></router-outlet>
    </div>
</div>
```
## Configuring Route parameters

Now loading the RecipeDetailComponent does not work anymore because we use _recipe_ as an input to
the RecipeDetailComponent and as we're now using routing to load the RecipeDetailComponent, this logic does not work anymore: _recipe_ can no longer be an input. that is, we have to change how we get the _recipe_ here.

Let's have a closer look at the recipe-detail.component.ts file:
```
import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input({required: true})
  recipe!: Recipe;

  constructor(private recipesService: RecipesService) {}

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
```

The recipe _id_ is passed via the route and can help us get the _recipe_ so we define a method
in the RecipesService to get the _recipe_ via its id 

### The RecipesService

```
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

// add @Injectable to be able to inject a service into this service
// we want to inject the ShoppingListService into this service
@Injectable()
export class RecipesService {
  onSelectRecipeEvt = new EventEmitter<Recipe>();
  selectedRecipe?: Recipe;

  private recipes: Recipe[] = [
    new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg',
      [new Ingredient('Meat', 1),
        new Ingredient('Tomatoe', 3)
      ]
    ),
    new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('Tomatoe', 5),
        new Ingredient('Onion', 2)
      ]
    )
  ];


  constructor(private shoppingListService: ShoppingListService ){}

  public getRecipes() {
    return this.recipes.slice(); // return a copy
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  public getRecipeById(id: number) {
    // As slice is not a deep copy
    // this.recipes.slice()[id] is equivalent to this.recipes[id]
    return this.recipes[id];

  }
}
```

### The RecipeItemComponent

recipe-item.component.ts is simplified to:
```
import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input({required:true})
  recipe !: Recipe;


}

```

recipe-item.component.html is simplified to:
```
<a class="list-group-item clearfix"
  style="cursor: pointer;">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>

```

### The RecipeDetailComponent

recipe-detail.component.ts:
```
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  recipeId?: number;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    /*
    * we cannot use
    *
    * const id = this.activatedRoute.snapshot.params['id'];
    *
    * as it will only work the first time we load the detail component. We want instead
    * to be able to react to changes in our recipe id and display the correct detail component
    * for that id => we need to subscribe to the observable activatedRoute.params
    */
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          // the + sign to convert params['id'] to a number
          this.recipeId = +params['id'];
          this.recipe = this.recipesService.getRecipeById(this.recipeId);
        }
      )
  }
  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }


}
```

Now we can enter the url http://localhost:4200/recipes/1  or http://localhost:4200/recipes/0 to
display the recipe detail but clicking on a recipe to display its detail does not work anymore

## Passing dynamic parameters to links

It's now time to fix the link used to select a recipe.

### The RecipeItemComponent

We add the _[routerLink]=[recipeId]_ to use the _relative path_ to the current route

The recipe-item.component.html:
```
<a class="list-group-item clearfix"
  style="cursor: pointer;"
  [routerLink]="[recipeId]">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>
```

The recipe-item.component.ts now has an input recipeId which will be set from the parent component RecipeListComponent:
```
import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input({required:true})
  recipe!: Recipe;

  @Input({required: true})
  recipeId!: number;

}
```

### The RecipeListComponent

the recipe-list.component.html:
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item *ngFor="let recipeItem of recipes; let i = index"
      [recipe]="recipeItem"
      [recipeId]="i"></app-recipe-item>
  </div>
</div>

```

## Styling Active recipe items

we simply add _routerLinkActive="active"_ to add the css class _active_ for the current active link and
remove it from the others.

Our new recipe-item.component.html:
```
<a class="list-group-item clearfix"
  style="cursor: pointer;"
  routerLinkActive="active"
  [routerLink]="[recipeId]">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath"
         alt="{{recipe.name}}"
         class="img-responsive"
         style="max-height: 50px;" />
  </span>
</a>
```

# Adding child routing for editing/adding recipes

## The RecipeEditComponent

We create a new component for editing/adding a recipe: RecipeEditComponent

## The AppRoutingModule

### A first attempt to define the child routes for editing/adding a recipe

we add the child routes _new_ and _:id/edit_ to the RecipesComponent as follows:

```
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {
    // the route that is loaded when we first visit the page
    path: '', redirectTo: '/recipes', pathMatch: "full"
  },
  {
    path: 'recipes', component: RecipesComponent,
    children: [
      {
        // detail component to load for the url http://localhost:4200/recipes/
        path: '', component: RecipeStartComponent
      },
      {
        // component to load for the url http://localhost:4200/recipes/${id}
        path: ':id', component: RecipeDetailComponent
      },
      {
        // path to a new recipe to add: http://localhost:4200/recipes/new
        path: 'new', component: RecipeEditComponent
      },
      {
        // path to edit a recipe
        path: ':id/edit', component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)  // configure the router
  ],
  exports: [
    RouterModule // make the router available to the parent module (i.e. AppModule)
  ]
})
export class AppRoutingModule {

}
```

When trying to load the url http://localhost:4200/recipes/new we get an error because the routes
are evaluated in the order they appear in the array. That is, becaus this url matches the pattern
http://localhost:4200/recipes/${id} and is evaluated as such first and an error occurs because there
is no recipe with id _new_

```
The more specific routes need to appear first in the appRoutes array
```

### Define the child routes using the right order

```
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {
    // the route that is loaded when we first visit the page
    path: '', redirectTo: '/recipes', pathMatch: "full"
  },
  {
    path: 'recipes', component: RecipesComponent,
    children: [
      {
        // detail component to load for the url http://localhost:4200/recipes/
        path: '', component: RecipeStartComponent
      },
      {
        // path to a new recipe to add: http://localhost:4200/recipes/new
        path: 'new', component: RecipeEditComponent
      },
      {
        // component to load for the url http://localhost:4200/recipes/${id}
        path: ':id', component: RecipeDetailComponent
      },
      {
        // path to edit a recipe
        path: ':id/edit', component: RecipeEditComponent
      }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)  // configure the router
  ],
  exports: [
    RouterModule // make the router available to the parent module (i.e. AppModule)
  ]
})
export class AppRoutingModule {

}
```

## Retrieving route parameters

In the RecipeEditComponent, we need to determine whether we are in editing or creation mode. to
do so we need to retrieve the route parameters using the activatedRoute. 

Our updated RecipeEditComponent
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id!: number | null;
  editMode!: boolean;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = null;
        } else {
          this.editMode = false;
          this.id = +idString;
        }
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

}
```

## fixing the links to the edit and creation mode using routerLink in the templates

We use the _routerLink_ to define the url of the links

recipe-list.component.html
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success" [routerLink]="['new']">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item *ngFor="let recipeItem of recipes; let i = index"
      [recipe]="recipeItem"
      [recipeId]="i"></app-recipe-item>
  </div>
</div>
```

recipe-detail.component.html
```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img [src]="recipe.imagePath"
        alt="{{recipe.description}}" class="img-responsive"
        style="max-height: 300px">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>{{recipe.name}}</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group" appDropdown>
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a (click)="onAddToShoppingList()" style="cursor: pointer;">To Shopping List</a>
        </li>
        <li>
          <!-- current route: recipes/id =>
                    relative path: edit
                    absolute path: recipes/id/edit
          -->
          <a style="cursor: pointer;" [routerLink]="['edit']">Edit Recipe</a>
        </li>
        <li>
          <a style="cursor: pointer;">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    {{recipe.description}}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let ingredient of recipe.ingredients">
        {{ingredient.name}}: {{ingredient.amount}}
      </li>
    </ul>
  </div>
</div>

```
## Programmatic Navigation to the edit page

Instead of using _routerLink_ in the templates we'll use the _router.navigate()_ method in the ts file
to navigate to the appropriate url.

### The RecipeListComponent

we replace the _routerLink_ in the template with a _click listener_. Our template is then changed from
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success" [routerLink]="['new']">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item *ngFor="let recipeItem of recipes; let i = index"
      [recipe]="recipeItem"
      [recipeId]="i"></app-recipe-item>
  </div>
</div>
```

to 

```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success" (click)="onNewRecipe()">New Recipe</button>
  </div>
</div>
<hr />
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item *ngFor="let recipeItem of recipes; let i = index"
      [recipe]="recipeItem"
      [recipeId]="i"></app-recipe-item>
  </div>
</div>


```

Then we use the _ActivatedRoute_ and _Router_ in our ts file to navigate to relative to the
activated route to the url _./new_. Our ts file is then:

```
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  /*
  * Inject the router to navigate programmatically to the new route
  * We also need activatedRoute to inform the router about our current route
  */
  constructor(private recipesService: RecipesService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  public get recipes() {
    return this.recipesService.getRecipes();
  }

  ngOnInit(): void {
  }

  public onNewRecipe(): void {
    // we are already on the path /recipe here so we can use a relative route: i.e. navigate to the ./new
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}

```

### The RecipeDetailComponent

We do the same modif in the RecipeDetailCompoent:
```
<div class="row">
  <!-- column spanning the whole width -->
  <div class="col-xs-12">
    <img [src]="recipe.imagePath"
        alt="{{recipe.description}}" class="img-responsive"
        style="max-height: 300px">
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <h1>{{recipe.name}}</h1>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    <!-- create a dropdown using bootstrap -->
    <div class="btn-group" appDropdown>
      <button value="" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a (click)="onAddToShoppingList()" style="cursor: pointer;">To Shopping List</a>
        </li>
        <li>
          <!-- current route: recipes/id =>
                    relative path: edit
                    absolute path: recipes/id/edit
          -->
          <!--   Using the routerLink to navigate to recipes/id/edit -->
          <!--
          <a style="cursor: pointer;" [routerLink]="['edit']">Edit Recipe</a>
          -->

           <!--   Using the router.navigate in the onEditRecipe() method of the
                        ts file to navigate to recipes/id/edit                   -->
          <a style="cursor: pointer;" (click)="onEditRecipe()">Edit Recipe</a>
        </li>
        <li>
          <a style="cursor: pointer;">Delete Recipe</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-xs-12">
    {{recipe.description}}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let ingredient of recipe.ingredients">
        {{ingredient.name}}: {{ingredient.amount}}
      </li>
    </ul>
  </div>
</div>
```

```
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  /*
  * Inject the router to navigate programmatically to the new route
  * We also need activatedRoute to inform the router about our current route
  */
  constructor(private recipesService: RecipesService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  public get recipes() {
    return this.recipesService.getRecipes();
  }

  ngOnInit(): void {
  }

  public onNewRecipe(): void {
    // we are already on the path /recipe here so we can use a relative route: i.e. navigate to the ./new
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}

```

## Note about obsevables

When you use _Angular observables_ such as _this.route.params_ you don't need to clean up as Angular will unsubscribe automatically for you.

But if you create your _own_ observables you'll have to clean up by unsubscribing manually

## Improving the Reactive Service with Observables (Subjects)

1. Replace EventEmitter from services with the better pattern _Subject_ from rxjs
```
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

  // Step 1: Replace EventEmitter with the better pattern Subject
  // updatedIngredientsEvt = new EventEmitter<Ingredient[]>();
  updatedIngredientsSubject = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.updatedIngredientsEvt.emit(this.ingredients.slice());
    this.updatedIngredientsSubject.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    /**
     * This is a viable option but it will emit a lot of events. It won't be bad
     * because even a recipe with 30 ingredients won't blow up our app but still there are
     * lots of unecessary event emissions. So even though it's a viable option, we'll comment
     * it out
     */
    // for (let Ingredient of this.ingredients) {
    //  this.addIngredient(Ingredient);
    // }

    /*
    * A different and better option would be to directly add all our ingredients in one go
    * and then emit our event.
    *
    * We use the spread operator to push all our ingredients to the ingredients array
    * That is, we use the fact that push can take a list of values. For exemple
    * myNumberArray.push(3, 5, 7);
    */
    this.ingredients.push(...ingredients);

    // emit the event
    // this.updatedIngredientsEvt.emit(this.ingredients.slice());
    this.updatedIngredientsSubject.next(this.ingredients.slice());
  }

}

```
2. store the subscription in a variable so that you can clean it up

```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Ingredient[];

   // Step 2: store the subscription in a variable so that you can clean it up (i.e. unsubscribe)
  private ingredientChangeSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    /*
    this.shoppingListService.updatedIngredientsEvt.subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients);
    */
    this.ingredientChangeSubscription =
      this.shoppingListService.updatedIngredientsSubject.subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients);


  }

  ngOnDestroy(): void {
    this.ingredientChangeSubscription?.unsubscribe();
  }


}

```

# Using the template driven approach for the forms

## The ShoppingListEditComponent form

1. We get rid of the local references _#nameInput_ and _#amountInput_
2. We also get rid of the click listener _(click)="onAddItem()_ on the submit button. 

```
Instead of using the click listener on the submit button, we want
to use _ngSubmit_ to submit the form when the submit button is clicked.
We also place a local reference on the form element and set it equals to ngForm: _#f="ngForm"_ to have access to the javascript object Angular creates behind the scene
```

```
<div class="row">
  <div class="col-xs-12">
    <form (ngSubmit)="onAddItem(currentForm)" #currentForm="ngForm">
      <div class="row">
        <!-- column spanning a width of 5. On small devices it should span the whole width -->
         <div class="col-sm-5 form-group">
            <label for="name">Name</label>

            <!-- We get rid of the local reference _#nameInput_
              <input type="text" id="name" class="form-control"
                    #nameInput />

              Instead we register the control using the name attribute to identify the control and ngModel
            -->
            <input type="text" id="name" class="form-control" name="name" ngModel />

         </div>

         <!-- column spanning a width of 2 -->
         <div class="col-sm-2 form-group">
            <label for="amount">Amount</label>
            <!-- We get rid of the local reference _#amountInput_
              <input type="number" id="amount" class="form-control"
                  #amountInput />

                Instead we register the control using the name attribute to identify the control and ngModel
            -->
            <input type="number" id="amount" class="form-control" name="amount" ngModel />
         </div>


         <div class="row">
             <!-- col spanning the whole width -->
            <div class="col-xs-12">
                <!--
                    btn-succes:  green
                    btn--danger: red
                    btn-primary: blue
                -->
                <!-- Get rid of the click listener (click)="onAddItem()
                  <button type="submit" class="btn btn-success" (click)="onAddItem()">Add</button>
                -->
                <button type="submit" class="btn btn-success">Add</button>
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="reset" class="btn btn-primary">Clear</button>
            </div>
         </div>
      </div>
    </form>
  </div>
</div>
```

The typescript file is then updated to:
```
import { ShoppingListService } from './../shopping-list.service';
import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  /* We can remove the ViewChild which was used to retrieve to the template ref #nameInpput and #amountInput
     as these template ref have been removed
  @ViewChild('nameInput')
  nameInputRef?: ElementRef;

  @ViewChild('amountInput')
  amountInputRef?: ElementRef;
  */

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(editForm: NgForm): void {
    /*
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    */
    const value = editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(ingredient);
  }

}
```

## Adding validation to the ShopingListEditComponent form

We add the _required_ attribute to the inputs and disable the submit button if the form is not valid:
```
<div class="row">
  <div class="col-xs-12">
    <form (ngSubmit)="onAddItem(currentForm)" #currentForm="ngForm">
      ...
      <input type="text" id="name" class="form-control" name="name" ngModel required />
      ...
      <input type="number" id="amount" class="form-control" name="amount" ngModel required />
      ...
      <button type="submit" class="btn btn-success" [disabled]="!currentForm.valid">Add</button>
      ...
```

## Adding positive amount validation for the amount input

We use the pattern validator: _pattern="^[1-9]+[0-9]*$"_. Note that we are binding to a string so we don't use
property binding and write _[pattern]="someProperty"_

```
<div class="row">
  <div class="col-xs-12">
    <form (ngSubmit)="onAddItem(currentForm)" #currentForm="ngForm">
      ...
      <input type="text" id="name" class="form-control" name="name" ngModel required />
      ...
      input type="number" id="amount" class="form-control" name="amount" ngModel required 
              pattern="^[1-9]+[0-9]*$" />
      ...
      <button type="submit" class="btn btn-success" [disabled]="!currentForm.valid">Add</button>
      ...
```

# Using the reactive approach for the forms
## Adding the RecipeEditComponent form template

```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success">Save</button>
          <button class="btn btn-danger">Cancel</button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input type="text" id="imagePath" class="form-control">
          </div>
        </div>
      </div>
      <!-- A row for the image preview -->
       <div class="row">
        <div class="col-xs-12">
          <img src="" alt="recipe image" class="img-responsive">
        </div>
       </div>

       <!-- Description of the recipe -->
        <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" class="form-control" rows="6">
              </textarea>
          </div>
        </div>
      </div>

      <!-- A row for the ingredients -->
       <div class="row">
        <div class="col-xs-12">
          <!-- For one ingredient: will be made into a list of rows later for a list of ingredients -->
          <div class="row">
            <div class="col-xs-8">
              <!-- ingredient name -->
              <input type="text "class="form-control">
            </div>
            <div class="col-xs-2">
               <!-- amount using a small width -->
               <input type="number" class="form-control">
            </div>
            <div class="col-xs-2">
               <!-- the button to delete the ingredient using a small width -->
                <button class="btn btn-danger">X</button>
            </div>
          </div>
        </div>
       </div>

    </form>
  </div>
</div>
```

## Creating the Form for Editing Recipes: Registering controls in the ts file

```
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  editMode!: boolean;
  recipeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = null;
        } else {
          this.editMode = false;
          this.id = +idString;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.id != null) {
      // we are in edit mode
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    // register the form controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })

  }

}

```
## Syncing HTML with the form

As we are now using the _reactive_ approach we need to import the _ReactiveFormsModule_. Our new _app.module.ts_:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

With the _ReactiveFormsModule_ imported, we now have access to the corresponding directives in the
template (for example the _formGroup_ and _formControl_ directives). We now sync our template with our ts file
using the _reactive_ directives: _formGroup_ and _fromControlName_
```
<div class="row">
  <div class="col-xs-12">
    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-xs-12">
          <button type="submit" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-danger">Cancel</button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" formControlName="name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input type="text" id="imagePath" class="form-control" formControlName="imagePath">
          </div>
        </div>
      </div>
      <!-- A row for the image preview -->
       <div class="row">
        <div class="col-xs-12">
          <img src="" alt="recipe image" class="img-responsive">
        </div>
       </div>

       <!-- Description of the recipe -->
        <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" class="form-control" rows="6" formControlName="description">
              </textarea>
          </div>
        </div>
      </div>

      <!-- A row for the ingredients -->
       <div class="row">
        <div class="col-xs-12">
          <!-- For one ingredient: will be made into a list of rows later for a list of ingredients -->
          <div class="row">
            <div class="col-xs-8">
              <!-- ingredient name -->
              <input type="text "class="form-control">
            </div>
            <div class="col-xs-2">
               <!-- amount using a small width -->
               <input type="number" class="form-control">
            </div>
            <div class="col-xs-2">
               <!-- the button to delete the ingredient using a small width -->
                <button class="btn btn-danger">X</button>
            </div>
          </div>
        </div>
       </div>

    </form>
  </div>
</div>

```


## Fixing a Bug

In the next lecture, we'll add some code to access the controls of our form array:

*ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls; let i = index"

This code will fail with the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a getter of your component code (the .ts file):

    get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

In the template, you can then use:

*ngFor="let ingredientCtrl of controls; let i = index"

This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).

## Adding ingredient controls to a form array

```
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  editMode!: boolean;
  recipeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

  get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = +idString;
        } else {
          this.editMode = false;
          this.id = null;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // notice how we must pass the type of the form array
    let recipeIngredients = new FormArray<FormGroup<
      {
        name: FormControl<string|null>,
        amount: FormControl<number|null>
      }>>([]);

    if (this.id != null) {
      // we are in edit mode
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    }

    // register the form controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    })

  }

}
```

```
<div class="row">
  <div class="col-xs-12">
    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-xs-12">
          <button type="submit" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-danger">Cancel</button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" formControlName="name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input type="text" id="imagePath" class="form-control" formControlName="imagePath">
          </div>
        </div>
      </div>
      <!-- A row for the image preview -->
       <div class="row">
        <div class="col-xs-12">
          <img src="" alt="recipe image" class="img-responsive">
        </div>
       </div>

       <!-- Description of the recipe -->
        <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" class="form-control" rows="6" formControlName="description">
              </textarea>
          </div>
        </div>
      </div>

      <!-- A row for the ingredients -->
       <div class="row">
        <div class="col-xs-12" formArrayName="ingredients">
          <!-- For one ingredient: will be made into a list of rows later for a list of ingredients -->
          <div class="row"
            *ngFor="let ingredientCtrl of controls; let i = index"
            [formGroupName]="i">
            <div class="col-xs-8">
              <!-- ingredient name -->
              <input type="text "class="form-control" formControlName="name">
            </div>
            <div class="col-xs-2">
               <!-- amount using a small width -->
               <input type="number" class="form-control" formControlName="amount">
            </div>
            <div class="col-xs-2">
               <!-- the button to delete the ingredient using a small width -->
                <button class="btn btn-danger">X</button>
            </div>
          </div>
        </div>
       </div>

    </form>
  </div>
</div>

```

## Adding New ingredient controls

We add the _Add Ingredient_ button and the method it triggers called _onAddIngredient()_

```
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  editMode!: boolean;
  recipeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

  get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = +idString;
        } else {
          this.editMode = false;
          this.id = null;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // notice how we must pass the type of the form array
    let recipeIngredients = new FormArray<FormGroup<
      {
        name: FormControl<string|null>,
        amount: FormControl<number|null>
      }>>([]);

    if (this.id != null) {
      // we are in edit mode
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    }

    // register the form controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    })

  }

}
```

```
<div class="row">
  <div class="col-xs-12">
    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-xs-12">
          <button type="submit" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-danger">Cancel</button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" formControlName="name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input type="text" id="imagePath" class="form-control" formControlName="imagePath">
          </div>
        </div>
      </div>
      <!-- A row for the image preview -->
       <div class="row">
        <div class="col-xs-12">
          <img src="" alt="recipe image" class="img-responsive">
        </div>
       </div>

       <!-- Description of the recipe -->
        <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea type="text" id="description" class="form-control" rows="6" formControlName="description">
              </textarea>
          </div>
        </div>
      </div>

      <!-- A row for the ingredients -->
       <div class="row">
        <div class="col-xs-12" formArrayName="ingredients">
          <!-- For one ingredient: will be made into a list of rows later for a list of ingredients -->
          <div class="row"
            *ngFor="let ingredientCtrl of controls; let i = index"
            [formGroupName]="i"
            style="margin-top: 10px;">
            <div class="col-xs-8">
              <!-- ingredient name -->
              <input type="text "class="form-control" formControlName="name">
            </div>
            <div class="col-xs-2">
               <!-- amount using a small width -->
               <input type="number" class="form-control" formControlName="amount">
            </div>
            <div class="col-xs-2">
               <!-- the button to delete the ingredient using a small width -->
                <button class="btn btn-danger">X</button>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-xs-12">
              <button type="button" class="btn btn-success" (click)="onAddIngredient()">Add Ingredient</button>
            </div>
          </div>
        </div>
       </div>

    </form>
  </div>
</div>
```

## Adding built-in validators to validate the user input

We change the _onAddIngredient()_ and _iniForm()_ methods by adding the built-in validators _required_ and _pattern_
as shown below:

```
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  ...
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        // set the default value to null and add the validators
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
                                  Validators.required,
                                  Validators.pattern(/^[1-9]+[1-9]*$/)
                                ])
      })
    );
  }
  private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      // notice how we must pass the type of the form array
      let recipeIngredients = new FormArray<FormGroup<
        {
          name: FormControl<string|null>,
          amount: FormControl<number|null>
        }>>([]);

      if (this.id != null) {
        // we are in edit mode
        const recipe = this.recipesService.getRecipeById(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
            }));
          }
        }
      }

      // register the form controls
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      })

    }
}
```


We disable the save button if the form is not valid:

```
<div class="row">
  <div class="col-xs-12">
    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <div class="col-xs-12">
          <button type="submit" class="btn btn-success" [disabled]="!recipeForm.valid">Save</button>
          <button type="button" class="btn btn-danger">Cancel</button>
        </div>
      </div>
      ...
```

Finally we set up the css to have the invalid fields (input or textarea) that have been touched displayed
with red borders:
```
input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

## Submitting the form

We add the _addRecipe_ and _updateRecipe_ methods to the _recipes.service.ts_ file:
```
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

// add @Injectable to be able to inject a service into this service
// we want to inject the ShoppingListService into this service
@Injectable()
export class RecipesService {
  onSelectRecipeEvt = new EventEmitter<Recipe>();
  selectedRecipe?: Recipe;

  ...

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }
}
```

### Submitting the form: approach 1

We create the new/updated recipe in the _onSubmit_ method and call the appropriate service method
either to add or update a recipe:

```
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  editMode!: boolean;
  recipeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

  get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = +idString;
        } else {
          this.editMode = false;
          this.id = null;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    const newrecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )
    if (this.id != null) {
      // we are in editMode
      this.recipesService.updateRecipe(this.id, newrecipe);
    } else {
      this.recipesService.addRecipe(newrecipe);
    }
  }

  ...

}

```

### Submitting the form: approoach 2

As the _value_ of our _html form_ has exactly the same format as our _Recipe_ model, our onSubmit method
can be simplified to use the form value as follows:

```
onSubmit(): void {
    if (this.id != null) {
      // we are in editMode
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(newrecipe);
    }
  }
```

## Adding the image preview

We use a template reference _imagePath_ on the url input.We then access this reference value the display the preview:
Our _edit.component.html_ contains the following updates:

```
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input type="text" id="imagePath" class="form-control" formControlName="imagePath"
                #imagePath>
          </div>
        </div>
      </div>
      <!-- A row for the image preview -->
       <div class="row">
        <div class="col-xs-12">
          <img [src]="imagePath.value" alt="recipe image" class="img-responsive">
        </div>
       </div>
```


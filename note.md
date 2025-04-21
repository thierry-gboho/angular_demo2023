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

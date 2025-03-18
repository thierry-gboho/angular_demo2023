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
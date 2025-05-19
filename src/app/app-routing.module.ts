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

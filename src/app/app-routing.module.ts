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

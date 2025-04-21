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

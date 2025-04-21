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

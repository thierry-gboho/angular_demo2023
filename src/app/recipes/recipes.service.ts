import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";


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

  public getRecipes() {
    // return a copy
    return this.recipes.slice();
  }
}

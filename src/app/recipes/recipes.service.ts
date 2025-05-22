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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }
}

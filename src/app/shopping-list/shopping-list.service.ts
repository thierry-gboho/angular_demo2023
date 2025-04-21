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

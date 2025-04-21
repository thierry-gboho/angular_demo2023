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

}

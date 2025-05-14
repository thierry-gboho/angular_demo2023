import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

  // Step 1: Replace EventEmitter with the better pattern Subject
  // updatedIngredientsEvt = new EventEmitter<Ingredient[]>();
  updatedIngredientsSubject = new Subject<Ingredient[]>();

  // will emit when we're editing a shopping item
  indexOfShoppingItemBeingEdited = new Subject<number>();

  private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return a copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.updatedIngredientsEvt.emit(this.ingredients.slice());
    this.updatedIngredientsSubject.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    /**
     * This is a viable option but it will emit a lot of events. It won't be bad
     * because even a recipe with 30 ingredients won't blow up our app but still there are
     * lots of unecessary event emissions. So even though it's a viable option, we'll comment
     * it out
     */
    // for (let Ingredient of this.ingredients) {
    //  this.addIngredient(Ingredient);
    // }

    /*
    * A different and better option would be to directly add all our ingredients in one go
    * and then emit our event.
    *
    * We use the spread operator to push all our ingredients to the ingredients array
    * That is, we use the fact that push can take a list of values. For exemple
    * myNumberArray.push(3, 5, 7);
    */
    this.ingredients.push(...ingredients);

    // emit the event
    // this.updatedIngredientsEvt.emit(this.ingredients.slice());
    this.updatedIngredientsSubject.next(this.ingredients.slice());
  }

}

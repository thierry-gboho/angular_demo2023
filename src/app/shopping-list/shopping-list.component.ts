import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Ingredient[];

   // Step 2: store the subscription in a variable so that you can clean it up (i.e. unsubscribe)
  private ingredientChangeSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    /*
    this.shoppingListService.updatedIngredientsEvt.subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients);
    */
    this.ingredientChangeSubscription =
      this.shoppingListService.updatedIngredientsSubject.subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients);


  }

  ngOnDestroy(): void {
    this.ingredientChangeSubscription?.unsubscribe();
  }

  onEditItem(index: number) {
    // emit the index of the item that is being editted
    // The ShoppingEditComponent will receive that emitted index
    this.shoppingListService.indexOfShoppingItemBeingEdited.next(index);
  }

}

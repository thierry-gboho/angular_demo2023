import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit , OnDestroy{

  /* Access the form */
  @ViewChild('currentForm')
  shoppingEditForm!: NgForm;

  editMode = false;
  indexOfItemBeingEdited: number | undefined;
  indexOfItemBeingEditedSubscription$!: Subscription;
  ingredientBeingEdited: Ingredient | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.indexOfItemBeingEditedSubscription$ = this.shoppingListService.indexOfShoppingItemBeingEdited
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.indexOfItemBeingEdited = index;
          this.ingredientBeingEdited = this.shoppingListService.getIngredient(index);

          // populate the form with the right values
          this.shoppingEditForm.setValue({
            name: this.ingredientBeingEdited.name,
            amount:  this.ingredientBeingEdited.amount
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.indexOfItemBeingEditedSubscription$.unsubscribe();
  }

  onAddItem(editForm: NgForm): void {
    /*
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    */
    const value = editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(ingredient);
  }

}

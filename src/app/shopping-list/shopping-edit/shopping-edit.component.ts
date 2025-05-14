import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit , OnDestroy{

  /* We can remove the ViewChild which was used to retrieve to the template ref #nameInpput and #amountInput
     as these template ref have been removed
  @ViewChild('nameInput')
  nameInputRef?: ElementRef;

  @ViewChild('amountInput')
  amountInputRef?: ElementRef;
  */

  editMode = false;
  indexOfItemBeingEdited: number | undefined;
  indexOfItemBeingEditedSubscription$!: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.indexOfItemBeingEditedSubscription$ = this.shoppingListService.indexOfShoppingItemBeingEdited
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.indexOfItemBeingEdited = index;
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

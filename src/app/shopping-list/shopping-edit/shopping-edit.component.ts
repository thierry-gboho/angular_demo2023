import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  nameInputRef?: ElementRef;

  @ViewChild('amountInput')
  amountInputRef?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(): void {
    const name = this.nameInputRef?.nativeElement.value;
    const amount = this.amountInputRef?.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(ingredient);
  }

}

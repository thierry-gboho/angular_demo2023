import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  @Output()
  selectedRecipeEvt = new EventEmitter<Recipe>();

  ngOnInit(): void {
    this.recipes = [
      new Recipe('Ratatouille', 'This is a simple test: ratatouille', 'assets/ratatouille.jpg'),
      new Recipe('Flan', 'This is a simple test: flan', 'assets/flan.jpg')
    ];
  }

  onSelectRecipe(recipe: Recipe): void  {
    this.selectedRecipeEvt.emit(recipe);
  }

}

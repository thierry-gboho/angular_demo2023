import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: []
})
export class RecipesComponent implements OnInit {

  selectedRecipe?: Recipe;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    // subscribe to the event emitter
    this.recipesService.onSelectRecipeEvt.subscribe(
      (recipe) => this.selectedRecipe = recipe
    );
  }



}

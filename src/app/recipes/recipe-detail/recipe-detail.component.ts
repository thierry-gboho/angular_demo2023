import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  recipeId?: number;

  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    /*
    * we cannot use
    *
    * const id = this.activatedRoute.snapshot.params['id'];
    *
    * as it will only work the first time we load the detail component. We want instead
    * to be able to react to changes in our recipe id and display the correct detail component
    * for that id => we need to subscribe to the observable activatedRoute.params
    */
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          // the + sign to convert params['id'] to a number
          this.recipeId = +params['id'];
          this.recipe = this.recipesService.getRecipeById(this.recipeId);
        }
      )
  }
  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }


}

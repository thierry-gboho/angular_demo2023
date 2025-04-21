import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input({required:true})
  recipe !: Recipe;

  constructor(private recipesService: RecipesService) {}

  onSelected(): void {
    this.recipesService.onSelectRecipeEvt.emit(this.recipe);
  }

}

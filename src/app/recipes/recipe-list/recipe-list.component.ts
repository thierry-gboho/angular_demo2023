import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  constructor(private recipesService: RecipesService) {}

  public get recipes() {
    return this.recipesService.getRecipes();
  }

  ngOnInit(): void {
  }

}

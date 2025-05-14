import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  /*
  * Inject the router to navigate programmatically to the new route
  * We also need activatedRoute to inform the router about our current route
  */
  constructor(private recipesService: RecipesService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  public get recipes() {
    return this.recipesService.getRecipes();
  }

  ngOnInit(): void {
  }

  public onNewRecipe(): void {
    // we are already on the path /recipe here so we can use a relative route: i.e. navigate to the ./new
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}

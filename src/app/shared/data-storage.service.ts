import { Ingredient } from './ingredient.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";

/**
 * The Injectable decorator is optional but is required as soon as you want to inject a service into this service
 */

@Injectable({providedIn: 'root'})
export class DataStorageService {

  private urlRecipes = "http://localhost:8080/recipes";

  constructor(private httpClient: HttpClient, private recipesService: RecipesService) {}

  storeRecipes() {
    const recipes =  this.recipesService.getRecipes();

    this.httpClient.post(this.urlRecipes, recipes)
      .subscribe(
        // response => console.log(response)
      );
  }

  fetchRecipes() {
    // To use the setRecipes we need to specify the type of the response data received from our http:
    this.httpClient.get<Recipe[]>(this.urlRecipes)
      // make sure each recipe has an array of ingredients (possibly empty)
      // we use the pipe from rxjs to use its map operator: we''ll map the response array to a new array
      .pipe(map(recipes => {
        // now we use the map method of Javascript array to map each of its elements
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }))
      .subscribe(
        response => {
          // console.log(response);
          this.recipesService.setRecipes(response);
        }
      )
  }
}

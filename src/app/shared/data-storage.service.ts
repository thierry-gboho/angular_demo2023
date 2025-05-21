import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";

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
        response => console.log(response)
      );
  }

  fetchRecipes() {
    this.httpClient.get(this.urlRecipes)
      .subscribe(
        response => console.log(response)
      )
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

/**
 * The Injectable decorator is optional but is required as soon as you want to inject a service into this service
 */

@Injectable({providedIn: 'root'})
export class DataStorageService {

  private urlRecipes = "http://localhost:8080/recipes";

  constructor(
    private httpClient: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes =  this.recipesService.getRecipes();

    this.authService.user.pipe(
      take(1),
      /*
      Use exhaustMap to wait for the user observable above to complete which will happen after we take the latest user
      as we specified take(1)
      Then we'll have access to that user in exhaustMap
      we then return a new observable from within exhaustMap which will be the new observable which will be the new observable
      in subsequent operators
      */
      exhaustMap(user => {
        // we now add the token in the request header

        // we now return the observable so that the interested party can subscribe to it
        // To use the setRecipes we need to specify the type of the response data received from our http:
        return this.httpClient.post(
            this.urlRecipes,
            recipes,
            {
              headers: {
                'Authorization': 'Bearer ' + user?.token
              }
            });
      })

    ).subscribe();
  }

  fetchRecipes() {
    /* We don't need an ongoing subscription so we use
          this.authService.user.subscribe().unsubscribe();
      or limit the values from the observable to 1 using the take operator => we don't need to manually unsubscribe
          as follows
    */
   return this.authService.user.pipe(
      take(1),
      /*
      Use exhaustMap to wait for the user observable above to complete which will happen after we take the latest user
      as we specified take(1)
      Then we'll have access to that user in exhaustMap
      we then return a new observable from within exhaustMap which will be the new observable which will be the new observable
      in subsequent operators
      */
      exhaustMap(user => {
        // we now add the token in the request header

        // we now return the observable so that the interested party can subscribe to it
        // To use the setRecipes we need to specify the type of the response data received from our http:
        return this.httpClient.get<Recipe[]>(
            this.urlRecipes,
            {
              headers: {
                'Authorization': 'Bearer ' + user?.token
              }
            });
      }),
      // make sure each recipe has an array of ingredients (possibly empty)
      // we''ll map the response array to a new array
      map(recipes => {
          // now we use the map method of Javascript array to map each of its elements
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
       }),
      // use the tap operator to set the recipes and allow the subscription to be made from the component
      tap(response => this.recipesService.setRecipes(response))

    );

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  /**
   *
   * @param dataStorageService Fixing a bug: right now every time we navigate to the urls associated with this resolver
   * it overwrittes the recipes and modifications we added to the recipes => we need to fetch data from the backend only if
   * there is no recipes in the recipesService yet
   */
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes();

    // we can now return the observable from the dataStorageService and the resolver will subscribe automatically
    // when we load the url associated with this resolver => it makes sure we load the data from the backend
    // before we navigate to the associated url
    return (!recipes || recipes.length == 0) ? this.dataStorageService.fetchRecipes() : recipes;
  }
}

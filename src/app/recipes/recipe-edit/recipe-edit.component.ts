import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  editMode!: boolean;
  recipeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = null;
        } else {
          this.editMode = false;
          this.id = +idString;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.id != null) {
      // we are in edit mode
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    // register the form controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })

  }

}

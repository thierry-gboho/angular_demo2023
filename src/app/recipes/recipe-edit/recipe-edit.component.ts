import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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

  get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const idString = params['id'];
        if (idString != null) {
          this.editMode = true;
          this.id = +idString;
        } else {
          this.editMode = false;
          this.id = null;
        }
        this.initForm();
        console.log('EditMode: ' + this.editMode);
      }
    )
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        // set the default value to null and add the validators
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
                                  Validators.required,
                                  Validators.pattern(/^[1-9]+[1-9]*$/)
                                ])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // notice how we must pass the type of the form array
    let recipeIngredients = new FormArray<FormGroup<
      {
        name: FormControl<string|null>,
        amount: FormControl<number|null>
      }>>([]);

    if (this.id != null) {
      // we are in edit mode
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
                            Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                          ])
          }));
        }
      }
    }

    // register the form controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })

  }

}

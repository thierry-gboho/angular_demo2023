package com.example.ngcourse.recipebook.controller;

import com.example.ngcourse.recipebook.modele.entity.Ingredient;
import com.example.ngcourse.recipebook.modele.entity.Recipe;
import com.example.ngcourse.recipebook.repository.IngredientRepository;
import com.example.ngcourse.recipebook.repository.RecipeRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "recipes", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@CrossOrigin
public class RecipeController {

  @NonNull
  private final RecipeRepository recipeRepository;

  @NonNull
  private final IngredientRepository ingredientRepository;

  @GetMapping("")
  public List<Recipe> findAllRecipes() {
    return this.recipeRepository.findAll();
  }

  @PostMapping("")
  public List<Recipe> saveRecipes(@RequestBody List<Recipe> recipes) {
    return this.recipeRepository.saveAll(recipes);
  }

}

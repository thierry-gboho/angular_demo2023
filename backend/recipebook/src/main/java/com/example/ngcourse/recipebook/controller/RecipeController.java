package com.example.ngcourse.recipebook.controller;

import com.example.ngcourse.recipebook.modele.entity.Recipe;
import com.example.ngcourse.recipebook.repository.RecipeRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "recipes", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@CrossOrigin
public class RecipeController {

  @NonNull
  private final RecipeRepository recipeRepository;

  @GetMapping("")
  public List<Recipe> findAllRecipes() {
    return this.recipeRepository.findAll();
  }

  @PostMapping("")
  public Recipe saveRecipe(@RequestBody Recipe recipe) {
    return this.recipeRepository.save(recipe);
  }

}

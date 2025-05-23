package com.example.ngcourse.recipebook.service;

import com.example.ngcourse.recipebook.modele.entity.Ingredient;
import com.example.ngcourse.recipebook.modele.entity.Recipe;
import com.example.ngcourse.recipebook.repository.IngredientRepository;
import com.example.ngcourse.recipebook.repository.RecipeRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DataInitializerService {

  @NonNull
  private final RecipeRepository recipeRepository;

  @NonNull
  private IngredientRepository ingredientRepository;

  @Transactional
  public void initializeData() {
    Set<Ingredient> ratatouilleIngredients = new HashSet<>(){{
      add(new Ingredient("Meat", 1L));
      add(new Ingredient("Tomatoes", 15L));
    }};

    Set<Ingredient> flanIngredients = new HashSet<>(){{
      add(new Ingredient("Meat", 3L));
      add(new Ingredient("Tomatoes", 5L));
      add(new Ingredient("Onion", 5L));
    }};

    this.ingredientRepository.saveAll(ratatouilleIngredients);
    this.ingredientRepository.saveAll(flanIngredients);

    List<Recipe> recipes = new ArrayList<>(){{
      add(new Recipe("Ratatouille", "This is a simple test: ratatouille",
        "assets/ratatouille.jpg", ratatouilleIngredients));
      add(new Recipe("Flan", "This is a simple test: flan",
        "assets/flan.jpg", flanIngredients));
    }};

    this.recipeRepository.saveAll(recipes);
  }

}

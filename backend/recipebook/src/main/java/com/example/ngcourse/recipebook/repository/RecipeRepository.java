package com.example.ngcourse.recipebook.repository;

import com.example.ngcourse.recipebook.modele.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}

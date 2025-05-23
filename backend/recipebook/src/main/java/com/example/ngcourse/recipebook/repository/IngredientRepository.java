package com.example.ngcourse.recipebook.repository;

import com.example.ngcourse.recipebook.modele.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}

package com.example.ngcourse.recipebook.modele.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "RECIPES")
@NoArgsConstructor
@Getter
public class Recipe implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @Setter
  private String name;

  @Setter
  private String description;

  @Setter
  private String imagePath;

  @Setter
  @OneToMany
  Set<Ingredient> ingredients;

  public Recipe(String name, String description, String imagePath, Set<Ingredient> ingredients) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Recipe recipe = (Recipe) o;
    return Objects.equals(name, recipe.name);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(name);
  }
}

package com.example.ngcourse.recipebook.service;

import com.example.ngcourse.recipebook.modele.entity.Ingredient;
import com.example.ngcourse.recipebook.modele.entity.Recipe;
import com.example.ngcourse.recipebook.modele.entity.Role;
import com.example.ngcourse.recipebook.modele.entity.User;
import com.example.ngcourse.recipebook.repository.IngredientRepository;
import com.example.ngcourse.recipebook.repository.RecipeRepository;
import com.example.ngcourse.recipebook.repository.RoleRepository;
import com.example.ngcourse.recipebook.repository.UserRepository;
import com.example.ngcourse.recipebook.util.RoleEnum;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataInitializerService {

  @NonNull
  private final RecipeRepository recipeRepository;

  @NonNull
  private IngredientRepository ingredientRepository;

  @NonNull
  private UserRepository userRepository;
  private final RoleRepository roleRepository;

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

    List<User> users = new ArrayList<>();
    List<Role> roles = new ArrayList<>();
    for (String[] info: new String[][] {
      {
        "admin@gmail.com", "password", "user-admin"
      },
      {
        "user@gmail.com", "password", "user"
      },
      {
        "admin2@gmail.com", "password", "user-admin"
      },
      {
        "user2@gmail.com", "password", "user"
      },
      {
        "user3@gmail.com", "password", "user"
      },
      {
        "user4@gmail.com", "password", "user"
      }
    }) {
      User user = new User(info[0], info[1]);
      if (info[2].contains("user")) {
        Role role = new Role(RoleEnum.USER.getCode());
        role.setUser(user);
        roles.add(role);

      }

      if (info[2].contains("admin")) {
        Role role = new Role(RoleEnum.ADMIN.getCode());
        role.setUser(user);
        roles.add(role);

      }

      users.add(user);
    }

    userRepository.saveAll(users);
    roleRepository.saveAll(roles);
  }

}

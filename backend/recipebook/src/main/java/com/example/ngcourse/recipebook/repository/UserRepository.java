package com.example.ngcourse.recipebook.repository;

import com.example.ngcourse.recipebook.modele.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  @EntityGraph(attributePaths = "roles")
  User findByEmail(String email);
}

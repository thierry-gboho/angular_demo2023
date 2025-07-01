package com.example.ngcourse.recipebook.modele.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@Getter
@Setter
public class User {

  private String localId;
  private String email;
  private boolean returnSecureToken;

  public User() {
    this.returnSecureToken = true;
  }

  private Set<String> roles = new HashSet<>();


}

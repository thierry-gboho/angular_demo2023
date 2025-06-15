package com.example.ngcourse.recipebook.modele.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

  private String localId;
  private String email;

  private Set<String> roles = new HashSet<>();


}

package com.example.ngcourse.recipebook.modele.dto;

import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserLogin implements Serializable {
  String email;
  String password;
  private boolean returnSecureToken;
}

package com.example.ngcourse.recipebook.modele.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserAuthenticationResponse extends UserSignupResponse {

  private boolean registered = true;

  public UserAuthenticationResponse(String token, String email, String localId) {
    super(email, localId);
    super.setIdToken(token);
  }
}

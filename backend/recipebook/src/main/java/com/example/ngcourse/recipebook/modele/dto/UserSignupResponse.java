package com.example.ngcourse.recipebook.modele.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserSignupResponse implements Serializable {

  private String kind = "identitytoolkit#SignupNewUserResponse";
  private String idToken = "not_used";    // The authentication token
  private String email;
  private String refreshToken = "not_used";
  private String expiresIn = "not_used";
  private String localId;

  public UserSignupResponse(String email, String localId) {
    this.email = email;
    this.localId = localId;
  }
}

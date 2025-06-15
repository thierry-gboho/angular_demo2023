package com.example.ngcourse.recipebook.util.exception;

public class UserAlreadyExistException extends Exception {
  public UserAlreadyExistException(String email) {
    super("user '" + email + "' already exists");
  }
}

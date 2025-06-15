package com.example.ngcourse.recipebook.util;

public enum RoleEnum {

  ADMIN {
    @Override
    public String getCode(){
      return "admin";
    }
    @Override
    public String toString(){
      return "ADMIN";
    }
    @Override
    public String capitalized(){
      return "Admin";
    }
  },
  USER {
    @Override
    public String toString(){
      return "USER";
    }
  };

  public String getCode() {
    return "user";
  }
  public String capitalized() {
    return "User";
  }
}

package com.example.ngcourse.recipebook.service.crud;

import com.example.ngcourse.recipebook.modele.dto.UserSignupResponse;
import com.example.ngcourse.recipebook.util.exception.UserAlreadyExistException;
import com.example.ngcourse.recipebook.modele.dto.User;

import java.util.List;

public interface UserService {

  List<User> findAll();
  UserSignupResponse saveUser(String email, String password) throws UserAlreadyExistException;
}

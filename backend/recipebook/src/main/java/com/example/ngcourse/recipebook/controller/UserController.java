package com.example.ngcourse.recipebook.controller;

import com.example.ngcourse.recipebook.modele.dto.User;
import com.example.ngcourse.recipebook.modele.dto.UserLogin;
import com.example.ngcourse.recipebook.modele.dto.UserSignupResponse;
import com.example.ngcourse.recipebook.service.crud.UserService;
import com.example.ngcourse.recipebook.util.exception.UserAlreadyExistException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

  @NonNull
  private UserService userService;

  @GetMapping("users")
  public List<User> findAllUsers() {
    return this.userService.findAll();
  }

  @PostMapping("signup")
  public UserSignupResponse signup(@RequestBody UserLogin userLogin) throws UserAlreadyExistException {
    return this.userService.saveUser(userLogin.getEmail(), userLogin.getPassword());
  }
}

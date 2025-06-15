package com.example.ngcourse.recipebook.controller;

import com.example.ngcourse.recipebook.modele.dto.User;
import com.example.ngcourse.recipebook.modele.dto.UserLogin;
import com.example.ngcourse.recipebook.modele.dto.UserSignupResponse;
import com.example.ngcourse.recipebook.modele.entity.Role;

import com.example.ngcourse.recipebook.repository.RoleRepository;
import com.example.ngcourse.recipebook.repository.UserRepository;
import com.example.ngcourse.recipebook.util.RoleEnum;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

  @NonNull
  private UserRepository userRepository;

  @NonNull
  private RoleRepository roleRepository;

  @GetMapping("users")
  public List<User> findAllUsers() {

    return this.userRepository.findAll().stream().map(e -> {
      User u = new User();
      u.setLocalId(String.valueOf(e.getId()));
      u.setEmail(e.getEmail());
      u.setRoles(e.getRoles().stream().map(Role::getCode).collect(Collectors.toSet()));
      return u;
    }).collect(Collectors.toList());
  }

  @PostMapping("signup")
  public UserSignupResponse signup(@RequestBody UserLogin userLogin) {
    com.example.ngcourse.recipebook.modele.entity.User user =
      new com.example.ngcourse.recipebook.modele.entity.User(userLogin.getEmail(), userLogin.getPassword());

    this.userRepository.save(user);

    Role role = new Role(RoleEnum.USER.getCode());
    role.setUser(user);
    roleRepository.save(role);

    return new UserSignupResponse(user.getEmail(), String.valueOf(user.getId()));

  }
}

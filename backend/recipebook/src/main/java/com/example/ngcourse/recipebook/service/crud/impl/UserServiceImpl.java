package com.example.ngcourse.recipebook.service.crud.impl;

import com.example.ngcourse.recipebook.modele.dto.User;
import com.example.ngcourse.recipebook.modele.dto.UserSignupResponse;
import com.example.ngcourse.recipebook.modele.entity.Role;

import com.example.ngcourse.recipebook.repository.RoleRepository;
import com.example.ngcourse.recipebook.repository.UserRepository;
import com.example.ngcourse.recipebook.service.crud.UserService;
import com.example.ngcourse.recipebook.util.RoleEnum;
import com.example.ngcourse.recipebook.util.exception.UserAlreadyExistException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  @NonNull
  private final UserRepository userRepository;

  @NonNull
  private final RoleRepository roleRepository;

  @Override
  public List<com.example.ngcourse.recipebook.modele.dto.User> findAll() {
    return this.userRepository.findAll().stream().map(e -> {
      User u = new User();
      u.setLocalId(String.valueOf(e.getId()));
      u.setEmail(e.getEmail());
      u.setRoles(e.getRoles().stream().map(Role::getCode).collect(Collectors.toSet()));
      return u;
    }).collect(Collectors.toList());
  }

  @Override
  public UserSignupResponse saveUser(String email, String password) throws UserAlreadyExistException {
    if (this.userRepository.findByEmail(email) != null)
      throw new UserAlreadyExistException(email);

    com.example.ngcourse.recipebook.modele.entity.User user =
      new com.example.ngcourse.recipebook.modele.entity.User(email, password);

    this.userRepository.save(user);

    Role role = new Role(RoleEnum.USER.getCode());
    role.setUser(user);
    roleRepository.save(role);

    return new UserSignupResponse(user.getEmail(), String.valueOf(user.getId()));
  }
}

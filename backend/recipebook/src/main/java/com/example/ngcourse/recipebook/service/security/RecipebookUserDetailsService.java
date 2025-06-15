package com.example.ngcourse.recipebook.service.security;

import com.example.ngcourse.recipebook.modele.entity.Role;
import com.example.ngcourse.recipebook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RecipebookUserDetailsService implements UserDetailsService {

  @Autowired
  BCryptPasswordEncoder passwordEncoder;

  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // fetch the user
    if (username == null)
      throw new UsernameNotFoundException("null username");

    com.example.ngcourse.recipebook.modele.entity.User user = userRepository.findByEmail(username);

    if (user ==  null)
      throw new UsernameNotFoundException(username);

    System.out.println("USER FOUND!!!!!!!!");

    // build and return the UserDetails
    return User.builder()
      .username(user.getEmail())
      .password(passwordEncoder.encode(user.getPassword()))
      .roles(user.getRoles().stream().map(Role::getCode).toArray(String[]::new))
      .build();

  }
}

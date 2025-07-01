package com.example.ngcourse.recipebook.filter;

import com.example.ngcourse.recipebook.modele.dto.UserAuthenticationResponse;
import com.example.ngcourse.recipebook.modele.dto.UserLogin;

import com.example.ngcourse.recipebook.modele.entity.User;
import com.example.ngcourse.recipebook.repository.UserRepository;
import com.example.ngcourse.recipebook.service.security.JwtTokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final UserRepository userRepository;
  private final JwtTokenService jwtTokenService;
  private final ObjectMapper objectMapper;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                 JwtTokenService jwtTokenService,
                                 UserRepository userRepository,
                                 String urlProcessed) {
    super.setAuthenticationManager(authenticationManager);
    super.setFilterProcessesUrl(urlProcessed);
    super.setUsernameParameter("email");

    this.jwtTokenService = jwtTokenService;
    this.objectMapper = new ObjectMapper();
    this.userRepository = userRepository;
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                          Authentication authResult) throws IOException, ServletException {
    UserDetails userDetails = (UserDetails) authResult.getPrincipal();
    response.setContentType("application/json");
    String token = jwtTokenService.generateToken(userDetails);
    String email = userDetails.getUsername();

    User user = this.userRepository.findByEmail(email);

    if (user != null) {
      user.setPassword(null);
      UserAuthenticationResponse userAuthenticationResponse =
        new UserAuthenticationResponse(token, email, String.valueOf(user.getId()));
      this.objectMapper.writeValue(response.getWriter(), userAuthenticationResponse);
      System.out.println(response.getWriter().toString());
    } else
      response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
    throws AuthenticationException {
    String requestBody;
    try {
      requestBody = request.getReader().lines().collect(Collectors.joining());
      UserLogin user = objectMapper.readValue(requestBody, UserLogin.class);
      UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

      System.out.println("TOKEN: " + token);
      return this.getAuthenticationManager().authenticate(token);
    } catch (IOException e) {
      throw new AuthenticationCredentialsNotFoundException(e.getMessage());
    }
  }
}

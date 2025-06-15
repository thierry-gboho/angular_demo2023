package com.example.ngcourse.recipebook.filter;

import com.example.ngcourse.recipebook.util.exception.MauvaisTokenException;
import com.example.ngcourse.recipebook.service.security.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  private final JwtTokenService jwtTokenService;

  public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtTokenService jwtTokenService) {
    super(authenticationManager);
    this.jwtTokenService = jwtTokenService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws IOException, ServletException {
    String token = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (token == null)
      SecurityContextHolder.clearContext();
    else {
      UsernamePasswordAuthenticationToken authentication;
      try {
        authentication = jwtTokenService.decodeToken(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      } catch (MauvaisTokenException e) {
        SecurityContextHolder.clearContext();
      }
    }
    chain.doFilter(request, response);
  }


}

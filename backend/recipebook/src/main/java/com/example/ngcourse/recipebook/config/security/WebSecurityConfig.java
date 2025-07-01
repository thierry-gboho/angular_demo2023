package com.example.ngcourse.recipebook.config.security;

import com.example.ngcourse.recipebook.filter.JwtAuthenticationFilter;
import com.example.ngcourse.recipebook.filter.JwtAuthorizationFilter;
import com.example.ngcourse.recipebook.repository.UserRepository;
import com.example.ngcourse.recipebook.service.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.http.HttpMethod;

import java.util.List;

@Configuration
public class WebSecurityConfig {

  private final String[] CORS_ORIGINS = {"http://localhost:4200"};
  private final String ROLE_USER = "user";

  @Autowired
  @Lazy
  private JwtTokenService jwtTokenService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  private UrlBasedCorsConfigurationSource configureCors() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(List.of(CORS_ORIGINS));
    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    corsConfiguration.setAllowedHeaders(List.of("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    return http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(corsConfigurer -> corsConfigurer.configurationSource(configureCors()))
      .addFilter(new JwtAuthenticationFilter(authenticationManager, jwtTokenService, userRepository,"/connexion"))
      .addFilter(new JwtAuthorizationFilter(authenticationManager, jwtTokenService))
      .authorizeHttpRequests(
        (authz) -> authz
          .requestMatchers(HttpMethod.GET, "/recipes").hasAnyRole(ROLE_USER)
          .requestMatchers(HttpMethod.POST, "/recipes").hasAnyRole(ROLE_USER)
          .requestMatchers(HttpMethod.POST, "/signup").permitAll()
          .requestMatchers(HttpMethod.POST, "/connexion").permitAll()
          .requestMatchers(HttpMethod.GET, "/users").permitAll()
          .anyRequest().authenticated()
      )
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .build();
  }

}

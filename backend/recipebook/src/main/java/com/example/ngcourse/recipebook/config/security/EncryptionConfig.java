package com.example.ngcourse.recipebook.config.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.crypto.SecretKey;

@Configuration
public class EncryptionConfig {

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecretKey getSecretKey() {
    SecureDigestAlgorithm<?, ?> secureDigestAlgorithm = Jwts.SIG.get().get("HS256");
    return ((MacAlgorithm) secureDigestAlgorithm).key().build();
  }
}

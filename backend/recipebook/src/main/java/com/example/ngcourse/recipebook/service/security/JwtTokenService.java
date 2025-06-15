package com.example.ngcourse.recipebook.service.security;

import com.example.ngcourse.recipebook.util.exception.MauvaisTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

  @Autowired
  private SecretKey secretKey;

  public static final String BEARER_PREFIX = "Bearer ";
  private static final long EXPIRATION_TIME = 3_600_000;

  public String generateToken(UserDetails userDetails) {
    String login = userDetails.getUsername();
    List<String> roles = userDetails.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .toList();

    Claims claims = Jwts.claims().subject(login)
      .add("roles", roles)
      .build();

    return Jwts.builder()
      .claims().empty().add(claims).and()
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
      .signWith(this.secretKey)
      .compact();
  }

  public String extractUsername(Jws<Claims> claimsJws) {
    return claimsJws.getPayload().getSubject();
  }

  public UsernamePasswordAuthenticationToken decodeToken(String token) throws MauvaisTokenException {
    if (token.startsWith(BEARER_PREFIX))
      token = token.replaceFirst(BEARER_PREFIX, "").trim();

    System.out.println("DECODED TOKEN: " + token);

    try {
      System.out.println("Step 1");
      Jws<Claims> claimsJws = Jwts.parser()
        .verifyWith(this.secretKey)
        .build()
        .parseSignedClaims(token);

      System.out.println("Step 2");
      String email = claimsJws.getPayload().getSubject();
      System.out.println("email: " + email);

      List<String> roles = new ArrayList<>();
      System.out.println("Step 3");
      for (Object s: claimsJws.getPayload().get("roles", List.class)) {
        System.out.println("role: " + (String)s);
        roles.add((String)s);
      }

      System.out.println("Step 4");
      List<SimpleGrantedAuthority> authorities =
        roles.stream()
          .map(SimpleGrantedAuthority::new)
          .collect(Collectors.toList());

      System.out.println("authorities: " + authorities);
      System.out.println("email: " + email);
      return new UsernamePasswordAuthenticationToken(email, null, authorities);

    } catch (JwtException e) {
      System.out.println(e.getMessage());
      throw new MauvaisTokenException("Token invalide");
    }
  }

  public String generateBearerToken(UserDetails userDetails) {
    return "Bearer " + this.generateToken(userDetails);
  }
}

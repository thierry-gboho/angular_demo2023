package com.example.ngcourse.recipebook.modele.entity;

import com.example.ngcourse.recipebook.util.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyGroup;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
@NoArgsConstructor
@Getter
public class User implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @Setter
  @Column(nullable = false)
  private String email;

  @Setter
  @Column(nullable = false)
  private String password;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @Setter
  @LazyGroup("roles")
  private Set<Role> roles = new HashSet<>();

  public User(String email, String password) {
    this.email = email;
    this.password = password;
    this.roles = new HashSet<>();
  }

  public void addRole(Role role) {
    roles.add(role);
  }
  public void addRoles(Set<Role> roles) {
    this.roles.addAll(roles);
  }

  public void removeRoles() {
    roles.clear();
  }
  public void removeRoles(Set<Role> roles) {
    this.roles.removeAll(roles);
  }


  public boolean hasRole(Role role){
    return roles.contains(role);
  }

  public boolean hasRoleAdmin(){

    return roles.contains(new Role(RoleEnum.ADMIN.getCode(), this));
  }
  public boolean hasRoleUser(){

    return roles.contains(new Role(RoleEnum.USER.getCode(), this));
  }

  public void setEmail(String email) {
    if( email == null) return;
    if(email.equals(this.email)) return;
    this.email = email;
  }

  public void setPassword(String password) {
    if( password == null || (password.isEmpty() || password.equals(this.password) )) return;

    this.password = password;
  }

  @Override
  public int hashCode() {
    if( this.email != null)
      return this.email.hashCode();

    return super.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    if( obj instanceof User)
      return this.email.equals(((User)obj).getEmail());

    return false;
  }

}

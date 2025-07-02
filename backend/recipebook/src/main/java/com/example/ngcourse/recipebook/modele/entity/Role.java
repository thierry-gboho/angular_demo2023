package com.example.ngcourse.recipebook.modele.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "ROLES",
  indexes = {
    @Index(name = "IDX_role_code", columnList = "code")
  },
  uniqueConstraints = {@UniqueConstraint(name = "UK_idUser_code",
    columnNames = {"code", "idUser"})})
@NoArgsConstructor
@Getter
public class Role implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "code", nullable = false, length = 50)
  private String code;

  @ManyToOne(optional = true, fetch = FetchType.LAZY)
  @Setter
  @JoinColumn(name = "idUser", nullable = false,
    foreignKey = @ForeignKey(name = "FK_role_idUser"))
  private User user;

  public Role(String code) {
    this.code = code;
  }

  public Role(String code, User user) {
    this.code = code;
    this.user = user;
  }

  public void setCode(String code) {
    if( code == null ) return;

    if(code.isEmpty() || code.equals(this.code)) return;
    this.code = code;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Role that = (Role) o;
    if (user != null) {
      if (that.user == null) return false;
      return code.equals(that.code) && user.getId().equals(that.user.getId());
    } else
      return code.equals(that.code);
  }

  @Override
  public int hashCode() {
    return user != null ? Objects.hash(code, user.getId()) : Objects.hashCode(code);
  }


}

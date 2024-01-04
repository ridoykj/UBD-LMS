package com.itbd.application.dao.user;

import java.util.HashSet;
import java.util.Set;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.user.person.PersonDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_user")
@Getter
@Setter
public class UserDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_user_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(length = 64)
    private String primaryPhone;

    @Column(length = 128)
    private String primaryEmail;

    @Column(columnDefinition = "longtext")
    private String permissions;

    @Column
    private Boolean isLocked;

    @Column
    private Boolean isExpired;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RolesDAO> roles = new HashSet<>();
}

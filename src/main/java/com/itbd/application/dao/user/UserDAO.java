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

    @Column(nullable = false, unique = true, name = "tx_username")
    private String username;

    @Column(nullable = false, name = "tx_password")
    private String password;

    @Column(length = 64, name = "tx_primary_phone")
    private String primaryPhone;

    @Column(length = 128, name = "tx_primary_email")
    private String primaryEmail;

    @Column(columnDefinition = "longtext", name = "tx_permissions")
    private String permissions;

    @Column(name = "has_locked")
    private Boolean hasLocked;

    @Column(name = "has_expired")
    private Boolean hasExpired;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

    @ManyToMany
    @JoinTable(name = "map_user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RolesDAO> roles = new HashSet<>();
}

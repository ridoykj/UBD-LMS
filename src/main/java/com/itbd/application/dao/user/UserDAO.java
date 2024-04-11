package com.itbd.application.dao.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.user.person.PersonDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "t_app_user")
@Getter
@Setter
public class UserDao extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_user_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_user_ver", nullable = false)
    private Long version;

    @Column(nullable = false, unique = true, name = "tx_username")
    private String username;

    @Column(nullable = false, name = "tx_password")
    private String password;

    @Column(length = 64, name = "tx_primary_phone", unique = true)
    private String primaryPhone;

    @Column(length = 128, name = "tx_primary_email", unique = true)
    private String primaryEmail;

    @Column(columnDefinition = "longtext", name = "tx_permissions")
    private String permissions;

    @Column(name = "has_locked")
    private Boolean hasLocked;

    @Column(name = "has_expired")
    private Boolean hasExpired;

    @OneToOne
    @JoinColumn(name = "id_person_key")
    @JsonBackReference
    private PersonDao person;

    @ManyToMany
    @JoinTable(name = "t_map_user_roles", joinColumns = @JoinColumn(name = "id_user_key"), inverseJoinColumns = @JoinColumn(name = "id_roles_key"))
    private Set<RolesDao> roles = new HashSet<>();
}

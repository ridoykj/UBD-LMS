package com.itbd.application.dao.user;

import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_roles")
@Getter
@Setter
public class RolesDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_roles_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_roles_ver", nullable = false)
    private Long version;

    @Column(nullable = false, unique = true, name = "tx_name")
    private String name;

    @Column(name = "tx_description")
    private String description;

    @Column(columnDefinition = "longtext")
    private String permissions;
    @ManyToMany
    @JoinTable(name = "map_user_roles", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<UserDAO> users = new HashSet<>();
}

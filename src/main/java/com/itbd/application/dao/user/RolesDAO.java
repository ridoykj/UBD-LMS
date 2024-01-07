package com.itbd.application.dao.user;

import java.util.HashSet;
import java.util.Set;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_roles")
@Getter
@Setter
public class RolesDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_roles_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

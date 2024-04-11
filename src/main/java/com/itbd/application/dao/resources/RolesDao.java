package com.itbd.application.dao.resources;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import com.itbd.application.dao.user.UserDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_app_roles")
@Getter
@Setter
public class RolesDao extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_roles_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_roles_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", unique = true, nullable = false)
    private String name;

    @Column(name = "tx_description")
    private String description;

    @ManyToMany
    @JoinTable(name = "t_map_user_roles", joinColumns = @JoinColumn(name = "id_roles_key"), inverseJoinColumns = @JoinColumn(name = "id_user_key"))
    private Set<UserDao> users = new HashSet<>();

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AppPermissionDao> permissions = new HashSet<>();
}

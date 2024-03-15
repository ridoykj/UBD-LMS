package com.itbd.application.dao.resources;

import com.itbd.application.converts.StringSetConverter;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_app_resource")
@Getter
@Setter
public class AppResourceDao extends AbstractEntity<Long> {

    @Id
    @Column(name = "tx_resource_key", nullable = false, unique = true, updatable = false)
    private String resourceId;

    @Version
    @Nullable
    @Column(name = "id_app_resource_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name", nullable = false)
    private String name;

    @Convert(converter = StringSetConverter.class)
    @Column(name = "tx_actions")
    private Set<String> actions = new HashSet<>();

    @Column(name = "tx_description")
    private String description;

    @OneToMany(mappedBy = "resource")
    Set<AppPermissionDao> permissions = new HashSet<>();
}

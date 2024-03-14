package com.itbd.application.dao.resources.permissions;

import com.itbd.application.converts.StringSetConverter;
import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.dao.resources.RolesDao;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "t_app_permission")
@Getter
@Setter
@IdClass(AppPermissionKey.class)
public class AppPermissionDao extends AbstractEntity<Long> {
    @Id
    private String resourceId;

    @Id
    private Long roleId;

//    @EmbeddedId
//    AppPermissionKey appPermissionKey;

    @Version
    @Nullable
    @Column(name = "id_app_permission_ver", nullable = false)
    private Long version;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "id_roles_key")
    private RolesDao role;

    @ManyToOne
    @MapsId("resourceId")
    @JoinColumn(name = "tx_resource_key")
    private AppResourceDao resource;

    @Convert(converter = StringSetConverter.class)
    @Column(name = "tx_allowed", nullable = false)
    @ColumnDefault("''")
    private Set<String> allowed = new HashSet<>();

    @Column(name = "tx_description")
    private String description;
}

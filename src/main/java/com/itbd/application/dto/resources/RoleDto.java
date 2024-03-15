package com.itbd.application.dto.resources;

import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import jakarta.persistence.Id;
import org.springframework.data.annotation.Version;

import java.util.Set;
import java.util.stream.Collectors;

public record RoleDto(
        @Id Long id,
        @Version Long version,
        String name,
        String description,
        Set<AppPermissionDao> permissions) {
    public static RoleDto fromEntity(RolesDao roles) {
        roles.setUsers(null);
//        roles.setPermissions(null);
        return new RoleDto(
                roles.getId(),
                roles.getVersion(),
                roles.getName(),
                roles.getDescription(),
                roles.getPermissions());
    }

    public static void fromDTO(RoleDto roleDTO, RolesDao rolesDAO) {
        rolesDAO.setId(roleDTO.id());
        rolesDAO.setVersion(roleDTO.version());
        rolesDAO.setName(roleDTO.name());
        rolesDAO.setDescription(roleDTO.description());
        rolesDAO.setPermissions(roleDTO.permissions());
    }
}

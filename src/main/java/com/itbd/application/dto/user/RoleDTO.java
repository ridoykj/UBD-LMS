package com.itbd.application.dto.user;

import com.itbd.application.dao.user.RolesDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record RoleDTO(
        Long id,
        @Version Long version,
        String name,
        String description,
        String permissions,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static RoleDTO fromEntity(RolesDAO roles) {
        return new RoleDTO(
                roles.getId(),
                roles.getVersion(),
                roles.getName(),
                roles.getDescription(),
                roles.getPermissions(),
                roles.getCreatedAt(),
                roles.getUpdatedAt());
    }

    public static void fromDTO(RoleDTO roleDTO, RolesDAO rolesDAO) {
        rolesDAO.setId(roleDTO.id());
        rolesDAO.setVersion(roleDTO.version());
        rolesDAO.setName(roleDTO.name());
        rolesDAO.setDescription(roleDTO.description());
        rolesDAO.setPermissions(roleDTO.permissions());
        rolesDAO.setCreatedAt(roleDTO.createdAt());
        rolesDAO.setUpdatedAt(roleDTO.updatedAt());
    }
}

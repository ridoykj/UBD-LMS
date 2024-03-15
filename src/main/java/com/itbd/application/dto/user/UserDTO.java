package com.itbd.application.dto.user;

import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.user.UserDao;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;
import java.util.Set;

public record UserDto(
        Long id,
        @Version Long version,
        String username,
        String password,
        String primaryPhone,
        String primaryEmail,
        Set<RolesDao> roles,
        String permissions,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
    public static UserDto fromEntity(UserDao user) {
        return new UserDto(
                user.getId(),
                user.getVersion(),
                user.getUsername(),
                user.getPassword(),
                user.getPrimaryPhone(),
                user.getPrimaryEmail(),
                user.getRoles(),
                user.getPermissions(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }

    public static void fromDTO(UserDto userDTO, UserDao userDAO) {
        userDAO.setId(userDTO.id());
        userDAO.setVersion(userDTO.version());
        userDAO.setUsername(userDTO.username());
        userDAO.setPassword(userDTO.password());
        userDAO.setPrimaryPhone(userDTO.primaryPhone());
        userDAO.setPrimaryEmail(userDTO.primaryEmail());
        userDAO.setRoles(userDTO.roles());
        userDAO.setPermissions(userDTO.permissions());
    }
}

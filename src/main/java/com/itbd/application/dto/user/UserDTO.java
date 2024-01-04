package com.itbd.application.dto.user;

import java.time.LocalDateTime;
import java.util.Set;

import com.itbd.application.dao.user.RolesDAO;
import com.itbd.application.dao.user.UserDAO;

public record UserDTO(
            Long id,
            String username,
            String password,
            String primaryPhone,
            String primaryEmail,
            Set<RolesDAO> roles,
            String permissions,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {
      public static UserDTO fromEntity(UserDAO user) {
            return new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getPassword(),
                        user.getPrimaryPhone(),
                        user.getPrimaryEmail(),
                        user.getRoles(),
                        user.getPermissions(),
                        user.getCreatedAt(),
                        user.getUpdatedAt());
      }

      public static void fromDTO(UserDTO userDTO, UserDAO userDAO) {
            userDAO.setId(userDTO.id());
            userDAO.setUsername(userDTO.username());
            userDAO.setPassword(userDTO.password());
            userDAO.setPrimaryPhone(userDTO.primaryPhone());
            userDAO.setPrimaryEmail(userDTO.primaryEmail());
            userDAO.setRoles(userDTO.roles());
            userDAO.setPermissions(userDTO.permissions());
            userDAO.setCreatedAt(userDTO.createdAt());
            userDAO.setUpdatedAt(userDTO.updatedAt());
      }
}

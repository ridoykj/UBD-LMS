package com.itbd.application.dto.resources.permissions;

import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

import java.util.Set;

public record AppPermissionDto(
        @Id String resourceId,
        @Id Long roleId,
        @Version Long version,
        Set<String> allowed,
        RolesDao role,
        AppResourceDao resource
) {
    public static AppPermissionDto fromEntity(AppPermissionDao appPermission) {
//        RolesDao role = appPermission.getRole();
//        role.setUsers(null);
//        role.setPermissions(null);
//        appPermission.setRole(role);

//        AppResourceDao resource = appPermission.getResource();
//        resource.setPermissions(null);
//        appPermission.setResource(resource);

        appPermission.setRole(null);
        appPermission.setResource(null);
        return new AppPermissionDto(
                appPermission.getResourceId(),
                appPermission.getRoleId(),
                appPermission.getVersion(),
                appPermission.getAllowed(),
                appPermission.getRole(),
                appPermission.getResource());
    }

    public static void fromDTO(AppPermissionDto appPermissionDTO, AppPermissionDao appPermissionDAO) {
//        appPermissionDAO.setResourceId(appPermissionDTO.resourceId());
//        appPermissionDAO.setRoleId(appPermissionDTO.roleId());
        appPermissionDAO.setVersion(appPermissionDTO.version());
        appPermissionDAO.setAllowed(appPermissionDTO.allowed());
//        appPermissionDAO.setRole(appPermissionDTO.role());
//        appPermissionDAO.setResource(appPermissionDTO.resource());
    }
}

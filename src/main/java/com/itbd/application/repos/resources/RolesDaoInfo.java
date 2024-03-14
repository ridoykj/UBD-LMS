package com.itbd.application.repos.resources;

import com.itbd.application.dao.resources.permissions.AppPermissionDao;

import java.util.Set;

/**
 * Projection for {@link com.itbd.application.dao.resources.RolesDao}
 */
public interface RolesDaoInfo {
    Set<AppPermissionDao> getPermissions();
}
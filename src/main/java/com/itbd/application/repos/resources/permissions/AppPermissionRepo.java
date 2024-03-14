package com.itbd.application.repos.resources.permissions;

import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import com.itbd.application.dao.resources.permissions.AppPermissionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Set;

public interface AppPermissionRepo extends JpaRepository<AppPermissionDao, AppPermissionKey>, JpaSpecificationExecutor<AppPermissionDao> {
    Set<AppPermissionDao> findByRoleId(Long roleId);
}
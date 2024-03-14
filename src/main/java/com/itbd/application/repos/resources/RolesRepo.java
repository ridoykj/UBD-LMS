package com.itbd.application.repos.resources;

import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface RolesRepo extends JpaRepository<RolesDao, Long>, JpaSpecificationExecutor<RolesDao> {
}
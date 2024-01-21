package com.itbd.application.repos.user;

import com.itbd.application.dao.user.RolesDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RolesRepo extends JpaRepository<RolesDAO, Long>, JpaSpecificationExecutor<RolesDAO> {
}
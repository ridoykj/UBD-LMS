package com.itbd.application.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.user.RolesDAO;

public interface RolesRepo extends JpaRepository<RolesDAO, Long>, JpaSpecificationExecutor<RolesDAO> {
}
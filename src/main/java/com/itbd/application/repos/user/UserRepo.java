package com.itbd.application.repos.user;

import com.itbd.application.dao.user.UserDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserRepo extends JpaRepository<UserDAO, Long>, JpaSpecificationExecutor<UserDAO> {
}

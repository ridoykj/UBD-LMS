package com.itbd.application.repos.user;

import com.itbd.application.dao.user.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserRepo extends JpaRepository<UserDao, Long>, JpaSpecificationExecutor<UserDao> {
}

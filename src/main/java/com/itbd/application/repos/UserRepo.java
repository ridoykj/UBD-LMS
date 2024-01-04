package com.itbd.application.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.UserDAO;


public interface UserRepo extends JpaRepository<UserDAO, Long> {
}

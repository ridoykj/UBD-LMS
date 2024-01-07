package com.itbd.application.repos.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.user.StudentDAO;

public interface StudentRepo extends JpaRepository<StudentDAO, Long>, JpaSpecificationExecutor<StudentDAO> {
}
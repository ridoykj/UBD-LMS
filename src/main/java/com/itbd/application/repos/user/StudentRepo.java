package com.itbd.application.repos.user;

import com.itbd.application.dao.user.StudentDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StudentRepo extends JpaRepository<StudentDAO, Long>, JpaSpecificationExecutor<StudentDAO> {
}
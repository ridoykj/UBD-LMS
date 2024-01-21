package com.itbd.application.repos.user;

import com.itbd.application.dao.user.InstructorDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InstructorRepo extends JpaRepository<InstructorDAO, Long>, JpaSpecificationExecutor<InstructorDAO> {
}
package com.itbd.application.repos.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.user.InstructorDAO;

public interface InstructorRepo extends JpaRepository<InstructorDAO, Long>, JpaSpecificationExecutor<InstructorDAO> {
}
package com.itbd.application.repos.org.edu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.edu.CourseDAO;

public interface CourseRepo  extends JpaRepository<CourseDAO, Long> , JpaSpecificationExecutor<CourseDAO>{
    
}

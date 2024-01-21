package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.CourseDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CourseRepo extends JpaRepository<CourseDAO, Long>, JpaSpecificationExecutor<CourseDAO> {

}

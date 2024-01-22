package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchCourseRepo extends JpaRepository<BatchCourseDAO, Long>, JpaSpecificationExecutor<BatchCourseDAO> {

}

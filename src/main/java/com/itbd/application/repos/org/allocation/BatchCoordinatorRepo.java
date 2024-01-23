package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface BatchCoordinatorRepo extends JpaRepository<BatchCoordinatorDAO, Long>, JpaSpecificationExecutor<BatchCoordinatorDAO> {

    Set<BatchCoordinatorDAO> findByBatchCourse(BatchCourseDAO item);
}

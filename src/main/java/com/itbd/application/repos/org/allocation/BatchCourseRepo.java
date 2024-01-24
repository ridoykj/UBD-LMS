package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchCourseRepo extends JpaRepository<BatchCourseDAO, Long>, JpaSpecificationExecutor<BatchCourseDAO> {
    Boolean existsBatchCourseDAOByBatchIdAndCourseId(Long batchId, Long courseId);
}

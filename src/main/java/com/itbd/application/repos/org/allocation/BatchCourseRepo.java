package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCourseDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchCourseRepo extends JpaRepository<BatchCourseDao, Long>, JpaSpecificationExecutor<BatchCourseDao> {
    Boolean existsBatchCourseDAOByBatchIdAndCourseId(Long batchId, Long courseId);
}

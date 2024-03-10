package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface BatchCoordinatorRepo extends JpaRepository<BatchCoordinatorDao, Long>, JpaSpecificationExecutor<BatchCoordinatorDao> {

    Set<BatchCoordinatorDao> findByBatchCourse(BatchCourseDao item);
}

package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchCoordinatorRepo extends JpaRepository<BatchCoordinatorDAO, Long>, JpaSpecificationExecutor<BatchCoordinatorDAO> {

}

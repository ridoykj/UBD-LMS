package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.BatchDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchRepo extends JpaRepository<BatchDAO, Long>, JpaSpecificationExecutor<BatchDAO> {

}

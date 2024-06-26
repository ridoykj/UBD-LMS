package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.BatchDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchRepo extends JpaRepository<BatchDao, Long>, JpaSpecificationExecutor<BatchDao> {

}

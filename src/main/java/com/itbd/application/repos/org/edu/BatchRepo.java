package com.itbd.application.repos.org.edu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.edu.BatchDAO;

public interface BatchRepo  extends JpaRepository<BatchDAO, Long> , JpaSpecificationExecutor<BatchDAO>{
    
}

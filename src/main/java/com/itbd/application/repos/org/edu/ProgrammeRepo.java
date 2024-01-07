package com.itbd.application.repos.org.edu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.edu.ProgrammeDAO;

public interface ProgrammeRepo extends JpaRepository<ProgrammeDAO, Long> , JpaSpecificationExecutor<ProgrammeDAO> {
    
}

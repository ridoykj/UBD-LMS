package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.ProgrammeDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProgrammeRepo extends JpaRepository<ProgrammeDAO, Long>, JpaSpecificationExecutor<ProgrammeDAO> {

}

package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.ProgrammeDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProgrammeRepo extends JpaRepository<ProgrammeDao, Long>, JpaSpecificationExecutor<ProgrammeDao> {

}

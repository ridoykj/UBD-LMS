package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.org.academic.SectionDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SectionRepo extends JpaRepository<SectionDao, Long>, JpaSpecificationExecutor<SectionDao> {

}

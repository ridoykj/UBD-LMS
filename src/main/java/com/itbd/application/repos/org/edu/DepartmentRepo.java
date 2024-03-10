package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.DepartmentDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DepartmentRepo extends JpaRepository<DepartmentDao, Long>, JpaSpecificationExecutor<DepartmentDao> {

}

package com.itbd.application.repos.user;

import com.itbd.application.dao.user.InstructorDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InstructorRepo extends JpaRepository<InstructorDao, Long>, JpaSpecificationExecutor<InstructorDao> {
}
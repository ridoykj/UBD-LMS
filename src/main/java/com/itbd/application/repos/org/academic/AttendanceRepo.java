package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.org.academic.AttendanceDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AttendanceRepo extends JpaRepository<AttendanceDAO, Long>, JpaSpecificationExecutor<AttendanceDAO> {

}

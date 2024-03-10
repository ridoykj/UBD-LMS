package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.org.academic.AttendanceDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AttendanceRepo extends JpaRepository<AttendanceDao, Long>, JpaSpecificationExecutor<AttendanceDao> {

}

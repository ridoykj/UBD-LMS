package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.ReservationDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReservationRepo extends JpaRepository<ReservationDao, Long>, JpaSpecificationExecutor<ReservationDao> {

}

package com.itbd.application.repos.org.edu;

import com.itbd.application.dao.org.edu.ReservationDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReservationRepo extends JpaRepository<ReservationDAO, Long>, JpaSpecificationExecutor<ReservationDAO> {

}

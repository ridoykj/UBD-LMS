package com.itbd.application.repos.org.edu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.edu.ReservationDAO;

public interface ReservationRepo extends JpaRepository<ReservationDAO, Long> , JpaSpecificationExecutor<ReservationDAO> {
    
}

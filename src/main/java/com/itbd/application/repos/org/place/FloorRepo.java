package com.itbd.application.repos.org.place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.place.FloorDAO;

public interface FloorRepo  extends JpaRepository<FloorDAO, Long> , JpaSpecificationExecutor<FloorDAO>{
    
}

package com.itbd.application.repos.org.place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.place.BuildingDAO;

public interface BuildingRepo  extends JpaRepository<BuildingDAO, Long> , JpaSpecificationExecutor<BuildingDAO>{
    
}

package com.itbd.application.repos.org.place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.place.SectorDAO;

public interface SectorRepo  extends JpaRepository<SectorDAO, Long> , JpaSpecificationExecutor<SectorDAO>{
    
}

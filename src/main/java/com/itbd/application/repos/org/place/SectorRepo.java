package com.itbd.application.repos.org.place;

import com.itbd.application.dao.org.place.SectorDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SectorRepo extends JpaRepository<SectorDAO, Long>, JpaSpecificationExecutor<SectorDAO> {

}

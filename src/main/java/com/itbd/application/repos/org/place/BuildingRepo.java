package com.itbd.application.repos.org.place;

import com.itbd.application.dao.org.place.BuildingDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BuildingRepo extends JpaRepository<BuildingDao, Long>, JpaSpecificationExecutor<BuildingDao> {

}

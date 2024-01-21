package com.itbd.application.repos.org.place;

import com.itbd.application.dao.org.place.FloorDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FloorRepo extends JpaRepository<FloorDAO, Long>, JpaSpecificationExecutor<FloorDAO> {

}

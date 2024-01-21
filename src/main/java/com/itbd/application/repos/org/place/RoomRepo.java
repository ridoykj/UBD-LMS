package com.itbd.application.repos.org.place;

import com.itbd.application.dao.org.place.RoomDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoomRepo extends JpaRepository<RoomDAO, Long>, JpaSpecificationExecutor<RoomDAO> {

}

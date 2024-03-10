package com.itbd.application.repos.org.place;

import com.itbd.application.dao.org.place.RoomDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoomRepo extends JpaRepository<RoomDao, Long>, JpaSpecificationExecutor<RoomDao> {

}

package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchRoomDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BatchRoomRepo extends JpaRepository<BatchRoomDao, Long>, JpaSpecificationExecutor<BatchRoomDao> {

}

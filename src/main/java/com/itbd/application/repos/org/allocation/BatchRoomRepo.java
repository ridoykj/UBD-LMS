package com.itbd.application.repos.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.allocation.BatchRoomDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface BatchRoomRepo extends JpaRepository<BatchRoomDAO, Long>, JpaSpecificationExecutor<BatchRoomDAO> {

}

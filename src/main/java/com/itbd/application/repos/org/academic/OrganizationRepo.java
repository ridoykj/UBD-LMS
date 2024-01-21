package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OrganizationRepo extends JpaRepository<OrganizationDAO, Long>, JpaSpecificationExecutor<OrganizationDAO> {

}

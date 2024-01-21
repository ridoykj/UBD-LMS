package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PersonRepo extends JpaRepository<PersonDAO, Long>, JpaSpecificationExecutor<PersonDAO> {

}

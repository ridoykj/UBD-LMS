package com.itbd.application.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.user.person.PersonDAO;

public interface PersonRepo extends JpaRepository<PersonDAO, Long>, JpaSpecificationExecutor<PersonDAO> {
}

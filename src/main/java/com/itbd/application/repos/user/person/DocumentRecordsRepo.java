package com.itbd.application.repos.user.person;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import java.util.Optional;


public interface DocumentRecordsRepo extends JpaRepository<DocumentRecordsDAO, Long> {

    Optional<DocumentRecordsDAO> findByPerson(PersonDAO p);
}

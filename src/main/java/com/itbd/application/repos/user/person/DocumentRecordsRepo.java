package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DocumentRecordsRepo extends JpaRepository<DocumentRecordsDAO, Long> {

    Optional<DocumentRecordsDAO> findByPerson(PersonDAO p);
}

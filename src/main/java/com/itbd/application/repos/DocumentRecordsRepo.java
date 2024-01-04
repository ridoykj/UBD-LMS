package com.itbd.application.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import java.util.Optional;


public interface DocumentRecordsRepo extends JpaRepository<DocumentRecordsDAO, Long> {

    Optional<DocumentRecordsDAO> findByPersonKey(PersonDAO p);
}

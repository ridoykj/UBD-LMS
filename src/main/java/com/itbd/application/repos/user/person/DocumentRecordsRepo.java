package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.DocumentRecordsDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DocumentRecordsRepo extends JpaRepository<DocumentRecordsDao, Long> {

    Optional<DocumentRecordsDao> findByPerson(PersonDao p);
}

package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ContactRepo extends JpaRepository<ContactDAO, Long> {

    Optional<ContactDAO> findByPerson(PersonDAO p);
}

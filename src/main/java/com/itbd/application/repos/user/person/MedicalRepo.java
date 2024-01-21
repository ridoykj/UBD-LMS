package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MedicalRepo extends JpaRepository<MedicalDAO, Long> {

    Optional<MedicalDAO> findByPerson(PersonDAO p);
}

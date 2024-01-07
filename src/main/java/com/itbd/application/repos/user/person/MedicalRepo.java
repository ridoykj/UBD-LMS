package com.itbd.application.repos.user.person;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.PersonDAO;

import java.util.Optional;


public interface MedicalRepo extends JpaRepository<MedicalDAO, Long> {

    Optional<MedicalDAO> findByPersonKey(PersonDAO p);
}

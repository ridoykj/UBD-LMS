package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.MedicalDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MedicalRepo extends JpaRepository<MedicalDao, Long> {

    Optional<MedicalDao> findByPerson(PersonDao p);
}

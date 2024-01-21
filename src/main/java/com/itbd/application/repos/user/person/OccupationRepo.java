package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.OccupationDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface OccupationRepo extends JpaRepository<OccupationDAO, Long> {

    Optional<OccupationDAO> findByPerson(PersonDAO p);
}

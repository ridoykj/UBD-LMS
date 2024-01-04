package com.itbd.application.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.person.OccupationDAO;
import com.itbd.application.dao.user.person.PersonDAO;


public interface OccupationRepo extends JpaRepository<OccupationDAO, Long> {

    Optional<OccupationDAO> findByPersonKey(PersonDAO p);
}

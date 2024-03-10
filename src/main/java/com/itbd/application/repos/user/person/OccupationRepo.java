package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.OccupationDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface OccupationRepo extends JpaRepository<OccupationDao, Long> {

    Optional<OccupationDao> findByPerson(PersonDao p);
}

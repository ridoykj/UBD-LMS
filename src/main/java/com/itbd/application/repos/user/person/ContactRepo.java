package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.ContactDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ContactRepo extends JpaRepository<ContactDao, Long> {

    Optional<ContactDao> findByPerson(PersonDao p);
}

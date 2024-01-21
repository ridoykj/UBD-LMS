package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepo extends JpaRepository<AddressDAO, Long> {

    Optional<AddressDAO> findByPerson(PersonDAO person);
    // Set<AddressDAO> findByPersonKey(PersonDAO person);
}

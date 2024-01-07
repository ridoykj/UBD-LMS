package com.itbd.application.repos.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.PersonDAO;

public interface AddressRepo extends JpaRepository<AddressDAO, Long> {

    Optional<AddressDAO> findByPersonKey(PersonDAO person);
    // Set<AddressDAO> findByPersonKey(PersonDAO personKey);
}

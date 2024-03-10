package com.itbd.application.repos.user.person;

import com.itbd.application.dao.user.person.AddressDao;
import com.itbd.application.dao.user.person.PersonDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepo extends JpaRepository<AddressDao, Long> {

    Optional<AddressDao> findByPerson(PersonDao person);
    // Set<AddressDAO> findByPersonKey(PersonDAO person);
}

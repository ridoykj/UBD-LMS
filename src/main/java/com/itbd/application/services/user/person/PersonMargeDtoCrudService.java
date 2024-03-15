package com.itbd.application.services.user.person;

import com.itbd.application.dao.user.person.*;
import com.itbd.application.dto.user.person.PersonMargeDto;
import com.itbd.application.repos.user.person.*;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class PersonMargeDtoCrudService implements CrudService<PersonMargeDto, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private PersonRepo personRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private ContactRepo contactRepo;
    @Autowired
    private DocumentRecordsRepo documentRecordsRepo;
    @Autowired
    private MedicalRepo medicalRepo;
    @Autowired
    private OccupationRepo occupationRepo;

    // public PersonMargeDtoCrudService(PersonRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull PersonMargeDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<PersonDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, PersonDao.class)
                : Specification.anyOf();
        Page<PersonDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(person -> {
            person.setAddress(addressRepo.findByPerson(person).orElse(new AddressDao()));
            person.setContact(contactRepo.findByPerson(person).orElse(new ContactDao()));
            person.setRecord(documentRecordsRepo.findByPerson(person).orElse(new DocumentRecordsDao()));
            person.setMedical(medicalRepo.findByPerson(person).orElse(new MedicalDao()));
            person.setOccupation(occupationRepo.findByPerson(person).orElse(new OccupationDao()));
            return PersonMargeDto.fromEntity(person);
        }).toList();
    }

    @Override
    @Transactional
    public @Nullable PersonMargeDto save(PersonMargeDto value) {
        boolean check = value.id() != null && value.id() > 0;
        PersonDao person = check
                ? personRepo.getReferenceById(value.id())
                : new PersonDao();

        PersonMargeDto.fromDTO(value, person);
        return PersonMargeDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
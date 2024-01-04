package com.itbd.application.services.user.person;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.user.person.PersonDTO;
import com.itbd.application.repos.AddressRepo;
import com.itbd.application.repos.PersonRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class PersonDtoCrudService implements CrudService<PersonDTO, Long> {

    private final PersonRepo personRepo;
    private final AddressRepo addressRepo;

    public PersonDtoCrudService(PersonRepo personRepo, AddressRepo addressRepo) {
        this.personRepo = personRepo;
        this.addressRepo = addressRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull PersonDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Page<PersonDAO> persons = personRepo.findAll(pageable);
        return persons.stream().map(p -> {            
            return p;
        }).map(PersonDTO::fromEntity).toList();
    }

    @Override
    public @Nullable PersonDTO save(PersonDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        PersonDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new PersonDAO();
        PersonDTO.fromDTO(value, person);

        person.setRecordComment(check ? "UPDATE" : "NEW");
        return PersonDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
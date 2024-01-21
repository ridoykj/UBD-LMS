package com.itbd.application.services.user.person;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.user.person.PersonDTO;
import com.itbd.application.repos.user.person.AddressRepo;
import com.itbd.application.repos.user.person.PersonRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class PersonDtoCrudService implements CrudService<PersonDTO, Long> {

    private final PersonRepo personRepo;
    private final AddressRepo addressRepo;
    private final JpaFilterConverter jpaFilterConverter;

    public PersonDtoCrudService(PersonRepo personRepo, AddressRepo addressRepo, JpaFilterConverter jpaFilterConverter) {
        this.personRepo = personRepo;
        this.addressRepo = addressRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull PersonDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<PersonDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, PersonDAO.class)
                : Specification.anyOf();
        Page<PersonDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(p -> {
            InstructorDAO instructor = p.getInstructor();
            AddressDAO address = p.getAddress();
//            address.setPersonKey(null);
            instructor.setReservations(null);
            p.setInstructor(instructor);
            p.setAddress(address);
            return p;
        }).map(PersonDTO::fromEntity).toList();
    }

    @Override
    public @Nullable PersonDTO save(PersonDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        PersonDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new PersonDAO();
        InstructorDAO instructor = person.getInstructor();
        AddressDAO address = person.getAddress();
        person.setInstructor(instructor);
        person.setAddress(address);

        System.out.println("name = " + instructor);

//        PersonDAO person = check
//                ? personRepo.findById(value.id()).get()
//                : new PersonDAO();

        PersonDTO.fromDTO(value, person);

        person.setRecordComment(check ? "UPDATE" : "NEW");
        return PersonDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
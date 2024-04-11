package com.itbd.application.services.user.person;

import com.itbd.application.dao.user.person.PersonDao;
import com.itbd.application.dto.user.person.PersonMargeDto;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class PersonMargeDtoCrudService implements CrudService<PersonMargeDto, Long> {

    private final JpaFilterConverter jpaFilterConverter;

    private final PersonRepo personRepo;

    public PersonMargeDtoCrudService(JpaFilterConverter jpaFilterConverter, PersonRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull PersonMargeDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<PersonDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, PersonDao.class)
                : Specification.anyOf();
        Page<PersonDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(PersonMargeDto::fromEntity).toList();
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
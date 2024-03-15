package com.itbd.application.services.user.person.instructor;

import com.itbd.application.dao.user.person.PersonDao;
import com.itbd.application.dto.user.instructor.InstructorMargeDto;
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
public class InstructorMargeDtoCrudService implements CrudService<InstructorMargeDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final PersonRepo personRepo;

    public InstructorMargeDtoCrudService(PersonRepo personRepo, JpaFilterConverter jpaFilterConverter) {
        this.personRepo = personRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull InstructorMargeDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<PersonDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, PersonDao.class)
                : Specification.anyOf();
        Page<PersonDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(InstructorMargeDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable InstructorMargeDto save(InstructorMargeDto value) {
        boolean check = value.id() != null && value.id() > 0;
        PersonDao person = check
                ? personRepo.getReferenceById(value.id())
                : new PersonDao();

        InstructorMargeDto.fromDTO(value, person);
        return InstructorMargeDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
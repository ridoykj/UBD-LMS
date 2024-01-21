package com.itbd.application.services.user.person.instructor;

import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.user.instructor.InstructorMargeDTO;
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
public class InstructorMargeDtoCrudService implements CrudService<InstructorMargeDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final PersonRepo personRepo;

    public InstructorMargeDtoCrudService(PersonRepo personRepo, JpaFilterConverter jpaFilterConverter) {
        this.personRepo = personRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull InstructorMargeDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<PersonDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, PersonDAO.class)
                : Specification.anyOf();
        Page<PersonDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(InstructorMargeDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable InstructorMargeDTO save(InstructorMargeDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        PersonDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new PersonDAO();

        person.setRecordComment(check ? "UPDATE" : "NEW");
        InstructorMargeDTO.fromDTO(value, person);
        return InstructorMargeDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
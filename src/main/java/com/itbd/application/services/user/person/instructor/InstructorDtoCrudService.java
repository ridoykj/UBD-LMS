package com.itbd.application.services.user.person.instructor;

import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dto.user.instructor.InstructorDto;
import com.itbd.application.repos.user.InstructorRepo;
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
public class InstructorDtoCrudService implements CrudService<InstructorDto, Long> {
    @Autowired
    private JpaFilterConverter jpaFilterConverter;
    @Autowired
    private InstructorRepo instructorRepo;
    // public PersonMargeDtoCrudService(BatchRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<InstructorDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<InstructorDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, InstructorDao.class)
                : Specification.anyOf();
        Page<InstructorDao> instructors = instructorRepo.findAll(spec, pageable);
        return instructors.stream().map(InstructorDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable InstructorDto save(InstructorDto value) {
        boolean check = value.id() != null && value.id() > 0;
        InstructorDao person = check
                ? instructorRepo.getReferenceById(value.id())
                : new InstructorDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        InstructorDto.fromDTO(value, person);
        return InstructorDto.fromEntity(instructorRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        instructorRepo.deleteById(id);
    }
}
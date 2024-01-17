package com.itbd.application.services.user.person.instructor;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dto.user.instructor.InstructorDTO;
import com.itbd.application.repos.user.InstructorRepo;
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
public class InstructorDtoCrudService implements CrudService<InstructorDTO, Long> {
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
    public List<InstructorDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<InstructorDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, InstructorDAO.class)
                : Specification.anyOf();
        Page<InstructorDAO> instructors = instructorRepo.findAll(spec, pageable);
        return instructors.stream().map(InstructorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable InstructorDTO save(InstructorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        InstructorDAO person = check
                ? instructorRepo.getReferenceById(value.id())
                : new InstructorDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        InstructorDTO.fromDTO(value, person);
        return InstructorDTO.fromEntity(instructorRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        instructorRepo.deleteById(id);
    }
}
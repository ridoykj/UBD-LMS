package com.itbd.application.services.user.person.student;

import com.itbd.application.dao.user.StudentDao;
import com.itbd.application.dto.user.student.StudentDto;
import com.itbd.application.repos.user.StudentRepo;
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
public class StudentDtoCrudService implements CrudService<StudentDto, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private StudentRepo personRepo;
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

    // public PersonMargeDtoCrudService(BatchRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<com.itbd.application.dto.user.student.StudentDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<StudentDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, StudentDao.class)
                : Specification.anyOf();
        Page<StudentDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(StudentDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable StudentDto save(StudentDto value) {
        boolean check = value.id() != null && value.id() > 0;
        StudentDao person = check
                ? personRepo.getReferenceById(value.id())
                : new StudentDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        StudentDto.fromDTO(value, person);
        return StudentDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
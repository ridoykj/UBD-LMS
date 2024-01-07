package com.itbd.application.services.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.user.StudentDAO;
import com.itbd.application.dto.user.StudentDTO;
import com.itbd.application.repos.user.StudentRepo;
import com.itbd.application.repos.user.person.AddressRepo;
import com.itbd.application.repos.user.person.ContactRepo;
import com.itbd.application.repos.user.person.DocumentRecordsRepo;
import com.itbd.application.repos.user.person.MedicalRepo;
import com.itbd.application.repos.user.person.OccupationRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class StudentDtoCrudService implements CrudService<StudentDTO, Long> {

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
    public List<@Nonnull StudentDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<StudentDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, StudentDAO.class)
                : Specification.anyOf();
        Page<StudentDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(StudentDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable StudentDTO save(StudentDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        StudentDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new StudentDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        StudentDTO.fromDTO(value, person);
        return StudentDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
package com.itbd.application.services.user.person.instructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dao.user.person.DocumentRecordsDAO;
import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.OccupationDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.user.instructor.InstructorMargeDTO;
import com.itbd.application.repos.user.person.AddressRepo;
import com.itbd.application.repos.user.person.ContactRepo;
import com.itbd.application.repos.user.person.DocumentRecordsRepo;
import com.itbd.application.repos.user.person.MedicalRepo;
import com.itbd.application.repos.user.person.OccupationRepo;
import com.itbd.application.repos.user.person.PersonRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class InstructorMargeDtoCrudService implements CrudService<InstructorMargeDTO, Long> {

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

    // public InstructorMargeDTOCrudService(PersonRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

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
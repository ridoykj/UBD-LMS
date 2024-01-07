package com.itbd.application.services.org.academic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.academic.AttendanceDAO;
import com.itbd.application.dto.org.academic.AttendanceDTO;
import com.itbd.application.repos.org.academic.AttendanceRepo;
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
public class AttendanceDtoCrudService implements CrudService<AttendanceDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private AttendanceRepo personRepo;
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

    // public PersonMargeDtoCrudService(AttendanceRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull AttendanceDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<AttendanceDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, AttendanceDAO.class)
                : Specification.anyOf();
        Page<AttendanceDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(AttendanceDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable AttendanceDTO save(AttendanceDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        AttendanceDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new AttendanceDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        AttendanceDTO.fromDTO(value, person);
        return AttendanceDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
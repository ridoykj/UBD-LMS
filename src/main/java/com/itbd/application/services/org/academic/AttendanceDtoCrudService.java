package com.itbd.application.services.org.academic;

import com.itbd.application.dao.org.academic.AttendanceDao;
import com.itbd.application.dto.org.academic.AttendanceDto;
import com.itbd.application.repos.org.academic.AttendanceRepo;
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
public class AttendanceDtoCrudService implements CrudService<AttendanceDto, Long> {

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
    public List<@Nonnull AttendanceDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<AttendanceDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, AttendanceDao.class)
                : Specification.anyOf();
        Page<AttendanceDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(AttendanceDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable AttendanceDto save(AttendanceDto value) {
        boolean check = value.id() != null && value.id() > 0;
        AttendanceDao person = check
                ? personRepo.getReferenceById(value.id())
                : new AttendanceDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        AttendanceDto.fromDTO(value, person);
        return AttendanceDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
package com.itbd.application.services.org.edu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dto.org.edu.ProgrammeDTO;
import com.itbd.application.repos.org.edu.ProgrammeRepo;
import com.itbd.application.repos.user.AddressRepo;
import com.itbd.application.repos.user.ContactRepo;
import com.itbd.application.repos.user.DocumentRecordsRepo;
import com.itbd.application.repos.user.MedicalRepo;
import com.itbd.application.repos.user.OccupationRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class ProgrammeDtoCrudService implements CrudService<ProgrammeDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private ProgrammeRepo personRepo;
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

    // public PersonMargeDtoCrudService(ProgrammeRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull ProgrammeDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<ProgrammeDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, ProgrammeDAO.class)
                : Specification.anyOf();
        Page<ProgrammeDAO> persons = personRepo.findAll(spec, pageable);
         return persons.stream().map(ProgrammeDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable ProgrammeDTO save(ProgrammeDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        ProgrammeDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new ProgrammeDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        ProgrammeDTO.fromDTO(value, person);
        return ProgrammeDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
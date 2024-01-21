package com.itbd.application.services.org.academic;

import com.itbd.application.dao.org.academic.SectionDAO;
import com.itbd.application.dto.org.academic.SectionDTO;
import com.itbd.application.repos.org.academic.SectionRepo;
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
public class SectionDtoCrudService implements CrudService<SectionDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private SectionRepo personRepo;
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

    // public PersonMargeDtoCrudService(SectionRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull SectionDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<SectionDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, SectionDAO.class)
                : Specification.anyOf();
        Page<SectionDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(SectionDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable SectionDTO save(SectionDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        SectionDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new SectionDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        SectionDTO.fromDTO(value, person);
        return SectionDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
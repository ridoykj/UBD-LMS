package com.itbd.application.services.org.academic;

import com.itbd.application.dao.org.academic.SectionDao;
import com.itbd.application.dto.org.academic.SectionDto;
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
public class SectionDtoCrudService implements CrudService<SectionDto, Long> {

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
    public List<@Nonnull SectionDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<SectionDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, SectionDao.class)
                : Specification.anyOf();
        Page<SectionDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(SectionDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable SectionDto save(SectionDto value) {
        boolean check = value.id() != null && value.id() > 0;
        SectionDao person = check
                ? personRepo.getReferenceById(value.id())
                : new SectionDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        SectionDto.fromDTO(value, person);
        return SectionDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
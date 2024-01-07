package com.itbd.application.services.org.place;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.place.SectorDAO;
import com.itbd.application.dto.org.place.SectorDTO;
import com.itbd.application.repos.org.place.SectorRepo;
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
public class SectorDtoCrudService implements CrudService<SectorDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private SectorRepo personRepo;
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

    // public PersonMargeDtoCrudService(SectorRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull SectorDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<SectorDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, SectorDAO.class)
                : Specification.anyOf();
        Page<SectorDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(SectorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable SectorDTO save(SectorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        SectorDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new SectorDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        SectorDTO.fromDTO(value, person);
        return SectorDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
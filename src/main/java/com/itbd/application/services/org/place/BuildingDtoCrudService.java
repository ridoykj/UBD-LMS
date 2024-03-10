package com.itbd.application.services.org.place;

import com.itbd.application.dao.org.place.BuildingDao;
import com.itbd.application.dto.org.place.BuildingDto;
import com.itbd.application.repos.org.place.BuildingRepo;
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
public class BuildingDtoCrudService implements CrudService<BuildingDto, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private BuildingRepo personRepo;
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

    // public PersonMargeDtoCrudService(BuildingRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull BuildingDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BuildingDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BuildingDao.class)
                : Specification.anyOf();
        Page<BuildingDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(BuildingDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BuildingDto save(BuildingDto value) {
        boolean check = value.id() != null && value.id() > 0;
        BuildingDao person = check
                ? personRepo.getReferenceById(value.id())
                : new BuildingDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BuildingDto.fromDTO(value, person);
        return BuildingDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
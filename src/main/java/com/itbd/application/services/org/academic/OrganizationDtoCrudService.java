package com.itbd.application.services.org.academic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import com.itbd.application.dto.org.academic.OrganizationDTO;
import com.itbd.application.repos.org.academic.OrganizationRepo;
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
public class OrganizationDtoCrudService implements CrudService<OrganizationDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private OrganizationRepo personRepo;
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

    // public PersonMargeDtoCrudService(TestimonialRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull OrganizationDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<OrganizationDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, OrganizationDAO.class)
                : Specification.anyOf();
        Page<OrganizationDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(o -> {
            o.setDepartments(null);
            return o;
        }).map(OrganizationDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable OrganizationDTO save(OrganizationDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        OrganizationDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new OrganizationDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        OrganizationDTO.fromDTO(value, person);
        return OrganizationDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
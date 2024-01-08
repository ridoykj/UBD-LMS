package com.itbd.application.services.org.edu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dto.org.edu.DepartmentDTO;
import com.itbd.application.repos.org.edu.DepartmentRepo;
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
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@BrowserCallable
@AnonymousAllowed
@Slf4j
public class DepartmentDtoCrudService implements CrudService<DepartmentDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private DepartmentRepo personRepo;
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

    // public PersonMargeDtoCrudService(DepartmentRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    // @Transactional
    @Override
    @Nonnull
    public List<@Nonnull DepartmentDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDAO.class)
                : Specification.anyOf();
        Page<DepartmentDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(d -> {
            OrganizationDAO organization = d.getOrganization();
            organization.setDepartments(null);
            d.setOrganization(organization);
            d.setProgrammes(List.of());
            return d;
        }).map(DepartmentDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable DepartmentDTO save(DepartmentDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        DepartmentDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new DepartmentDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        DepartmentDTO.fromDTO(value, person);
        return DepartmentDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }

    public Page<DepartmentDAO> lazyList(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDAO.class)
                : Specification.anyOf();
        return personRepo.findAll(spec, pageable);
    }
}
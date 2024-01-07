package com.itbd.application.services.org.edu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dto.org.edu.BatchDTO;
import com.itbd.application.repos.org.edu.BatchRepo;
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
public class BatchDtoCrudService implements CrudService<BatchDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private BatchRepo personRepo;
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

    // public PersonMargeDtoCrudService(BatchRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull BatchDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchDAO.class)
                : Specification.anyOf();
        Page<BatchDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(BatchDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchDTO save(BatchDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new BatchDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchDTO.fromDTO(value, person);
        return BatchDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
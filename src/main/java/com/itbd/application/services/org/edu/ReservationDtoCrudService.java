package com.itbd.application.services.org.edu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dto.org.edu.ReservationDTO;
import com.itbd.application.repos.org.edu.ReservationRepo;
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
public class ReservationDtoCrudService implements CrudService<ReservationDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private ReservationRepo personRepo;
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

    // public PersonMargeDtoCrudService(ReservationRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull ReservationDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<ReservationDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, ReservationDAO.class)
                : Specification.anyOf();
        Page<ReservationDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(ReservationDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable ReservationDTO save(ReservationDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        ReservationDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new ReservationDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        ReservationDTO.fromDTO(value, person);
        return ReservationDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
package com.itbd.application.services.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.AddressDAO;
import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dao.user.person.MedicalDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.user.InstructorDTO;
import com.itbd.application.repos.user.InstructorRepo;
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
public class InstructorDtoCrudService implements CrudService<InstructorDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private InstructorRepo personRepo;
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
    public List<@Nonnull InstructorDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<InstructorDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, InstructorDAO.class)
                : Specification.anyOf();
        Page<InstructorDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(in -> {
            PersonDAO person = in.getPersonKey();
            ContactDAO contact = person.getContacts();
            AddressDAO address = person.getAddresses();
            MedicalDAO medical = person.getMedicals();            
            in.setReservations(null);
            return in;
        }).map(InstructorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable InstructorDTO save(InstructorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        InstructorDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new InstructorDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        InstructorDTO.fromDTO(value, person);
        return InstructorDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
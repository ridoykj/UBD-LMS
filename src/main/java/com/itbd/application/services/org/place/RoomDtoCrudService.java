package com.itbd.application.services.org.place;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dto.org.place.RoomDTO;
import com.itbd.application.repos.org.place.RoomRepo;
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
public class RoomDtoCrudService implements CrudService<RoomDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private RoomRepo personRepo;
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

    // public PersonMargeDtoCrudService(RoomRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull RoomDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<RoomDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, RoomDAO.class)
                : Specification.anyOf();
        Page<RoomDAO> persons = personRepo.findAll(spec, pageable);
         return persons.stream().map(RoomDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable RoomDTO save(RoomDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        RoomDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new RoomDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        RoomDTO.fromDTO(value, person);
        return RoomDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
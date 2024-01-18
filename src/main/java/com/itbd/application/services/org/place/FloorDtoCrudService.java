package com.itbd.application.services.org.place;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.place.FloorDAO;
import com.itbd.application.dto.org.place.FloorDTO;
import com.itbd.application.repos.org.place.FloorRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class FloorDtoCrudService implements CrudService<FloorDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private FloorRepo floorRepo;

    // public PersonMargeDtoCrudService(FloorRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull FloorDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<FloorDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, FloorDAO.class)
                : Specification.anyOf();
        Page<FloorDAO> persons = floorRepo.findAll(spec, pageable);
        return persons.stream().map(FloorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable FloorDTO save(FloorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        FloorDAO person = check
                ? floorRepo.getReferenceById(value.id())
                : new FloorDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        FloorDTO.fromDTO(value, person);
        return FloorDTO.fromEntity(floorRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        floorRepo.deleteById(id);
    }
}
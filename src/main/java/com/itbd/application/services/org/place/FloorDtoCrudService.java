package com.itbd.application.services.org.place;

import com.itbd.application.dao.org.place.FloorDao;
import com.itbd.application.dto.org.place.FloorDto;
import com.itbd.application.repos.org.place.FloorRepo;
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
public class FloorDtoCrudService implements CrudService<FloorDto, Long> {

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
    public List<@Nonnull FloorDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<FloorDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, FloorDao.class)
                : Specification.anyOf();
        Page<FloorDao> persons = floorRepo.findAll(spec, pageable);
        return persons.stream().map(FloorDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable FloorDto save(FloorDto value) {
        boolean check = value.id() != null && value.id() > 0;
        FloorDao person = check
                ? floorRepo.getReferenceById(value.id())
                : new FloorDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        FloorDto.fromDTO(value, person);
        return FloorDto.fromEntity(floorRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        floorRepo.deleteById(id);
    }
}
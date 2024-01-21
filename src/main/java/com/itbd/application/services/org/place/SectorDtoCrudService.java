package com.itbd.application.services.org.place;

import com.itbd.application.dao.org.place.SectorDAO;
import com.itbd.application.dto.org.place.SectorDTO;
import com.itbd.application.repos.org.place.SectorRepo;
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
public class SectorDtoCrudService implements CrudService<SectorDTO, Long> {
    @Autowired
    private JpaFilterConverter jpaFilterConverter;
    @Autowired
    private SectorRepo sectorRepo;

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
        Page<SectorDAO> persons = sectorRepo.findAll(spec, pageable);
        return persons.stream().map(SectorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable SectorDTO save(SectorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        SectorDAO person = check
                ? sectorRepo.getReferenceById(value.id())
                : new SectorDAO();

        SectorDTO.fromDTO(value, person);
        return SectorDTO.fromEntity(sectorRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        sectorRepo.deleteById(id);
    }
}
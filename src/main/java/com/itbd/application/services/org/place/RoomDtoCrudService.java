package com.itbd.application.services.org.place;

import com.itbd.application.dao.org.place.RoomDao;
import com.itbd.application.dto.org.place.RoomDto;
import com.itbd.application.repos.org.place.RoomRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class RoomDtoCrudService implements CrudService<RoomDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final RoomRepo roomRepo;

    public RoomDtoCrudService(RoomRepo roomRepo, JpaFilterConverter jpaFilterConverter) {
        this.roomRepo = roomRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull RoomDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<RoomDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, RoomDao.class)
                : Specification.anyOf();
        Page<RoomDao> persons = roomRepo.findAll(spec, pageable);
        return persons.stream().map(RoomDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable RoomDto save(RoomDto value) {
        boolean check = value.id() != null && value.id() > 0;
        RoomDao person = check
                ? roomRepo.getReferenceById(value.id())
                : new RoomDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        RoomDto.fromDTO(value, person);
        return RoomDto.fromEntity(roomRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        roomRepo.deleteById(id);
    }
}
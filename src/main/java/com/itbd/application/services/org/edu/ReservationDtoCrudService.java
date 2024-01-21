package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.ReservationDAO;
import com.itbd.application.dto.org.edu.ReservationDTO;
import com.itbd.application.repos.org.edu.ReservationRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class ReservationDtoCrudService implements CrudService<ReservationDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final ReservationRepo reservationRepo;

    public ReservationDtoCrudService(ReservationRepo reservationRepo, JpaFilterConverter jpaFilterConverter) {
        this.reservationRepo = reservationRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull ReservationDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<ReservationDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, ReservationDAO.class)
                : Specification.anyOf();
        Page<ReservationDAO> persons = reservationRepo.findAll(spec, pageable);
        return persons.stream().map(ReservationDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable ReservationDTO save(ReservationDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        ReservationDAO reservation = check
                ? reservationRepo.getReferenceById(value.id())
                : new ReservationDAO();

        ReservationDTO.fromDTO(value, reservation);
        return ReservationDTO.fromEntity(reservationRepo.save(reservation));
    }

    @Override
    public void delete(Long id) {
        reservationRepo.deleteById(id);
    }
}
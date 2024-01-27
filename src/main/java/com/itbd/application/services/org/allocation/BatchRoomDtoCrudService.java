package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchRoomDAO;
import com.itbd.application.dto.org.allocation.BatchRoomDTO;
import com.itbd.application.repos.org.allocation.BatchRoomRepo;
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
public class BatchRoomDtoCrudService implements CrudService<BatchRoomDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final BatchRoomRepo batchRoomRepo;
    public BatchRoomDtoCrudService(BatchRoomRepo batchRoomRepo, JpaFilterConverter jpaFilterConverter) {
        this.batchRoomRepo = batchRoomRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull BatchRoomDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchRoomDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchRoomDAO.class)
                : Specification.anyOf();
        Page<BatchRoomDAO> persons = batchRoomRepo.findAll(spec, pageable);
        return persons.stream().map(BatchRoomDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchRoomDTO save(BatchRoomDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchRoomDAO batchCourse = check
                ? batchRoomRepo.getReferenceById(value.id())
                : new BatchRoomDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchRoomDTO.fromDTO(value, batchCourse);
        return BatchRoomDTO.fromEntity(batchRoomRepo.save(batchCourse));
    }

    @Override
    public void delete(Long id) {
        batchRoomRepo.deleteById(id);
    }
}
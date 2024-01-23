package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dto.org.allocation.BatchCoordinatorDTO;
import com.itbd.application.repos.org.allocation.BatchCoordinatorRepo;
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
public class BatchCoordinatorDtoCrudService implements CrudService<BatchCoordinatorDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final BatchCoordinatorRepo batchCoordinatorRepo;
    public BatchCoordinatorDtoCrudService(BatchCoordinatorRepo batchCoordinatorRepo, JpaFilterConverter jpaFilterConverter) {
        this.batchCoordinatorRepo = batchCoordinatorRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull BatchCoordinatorDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchCoordinatorDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchCoordinatorDAO.class)
                : Specification.anyOf();
        Page<BatchCoordinatorDAO> persons = batchCoordinatorRepo.findAll(spec, pageable);
        return persons.stream().map(BatchCoordinatorDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchCoordinatorDTO save(BatchCoordinatorDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchCoordinatorDAO batchCourse = check
                ? batchCoordinatorRepo.getReferenceById(value.id())
                : new BatchCoordinatorDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchCoordinatorDTO.fromDTO(value, batchCourse);
        return BatchCoordinatorDTO.fromEntity(batchCoordinatorRepo.save(batchCourse));
    }

    @Override
    public void delete(Long id) {
        batchCoordinatorRepo.deleteById(id);
    }
}
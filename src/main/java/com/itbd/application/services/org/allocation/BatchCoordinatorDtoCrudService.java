package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dto.org.allocation.BatchCoordinatorDto;
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
public class BatchCoordinatorDtoCrudService implements CrudService<BatchCoordinatorDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final BatchCoordinatorRepo batchCoordinatorRepo;
    public BatchCoordinatorDtoCrudService(BatchCoordinatorRepo batchCoordinatorRepo, JpaFilterConverter jpaFilterConverter) {
        this.batchCoordinatorRepo = batchCoordinatorRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull BatchCoordinatorDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchCoordinatorDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchCoordinatorDao.class)
                : Specification.anyOf();
        Page<BatchCoordinatorDao> persons = batchCoordinatorRepo.findAll(spec, pageable);
        return persons.stream().map(BatchCoordinatorDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchCoordinatorDto save(BatchCoordinatorDto value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchCoordinatorDao batchCourse = check
                ? batchCoordinatorRepo.getReferenceById(value.id())
                : new BatchCoordinatorDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchCoordinatorDto.fromDTO(value, batchCourse);
        return BatchCoordinatorDto.fromEntity(batchCoordinatorRepo.save(batchCourse));
    }

    @Override
    public void delete(Long id) {
        batchCoordinatorRepo.deleteById(id);
    }
}
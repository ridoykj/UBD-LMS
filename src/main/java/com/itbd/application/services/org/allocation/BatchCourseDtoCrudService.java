package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dto.org.allocation.BatchCourseDTO;
import com.itbd.application.repos.org.allocation.BatchCourseRepo;
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
public class BatchCourseDtoCrudService implements CrudService<BatchCourseDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private BatchCourseRepo batchCourseRepo;

    // public PersonMargeDtoCrudService(CourseRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull BatchCourseDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchCourseDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchCourseDAO.class)
                : Specification.anyOf();
        Page<BatchCourseDAO> persons = batchCourseRepo.findAll(spec, pageable);
        return persons.stream().map(BatchCourseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchCourseDTO save(BatchCourseDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchCourseDAO batchCourse = check
                ? batchCourseRepo.getReferenceById(value.id())
                : new BatchCourseDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchCourseDTO.fromDTO(value, batchCourse);
        return BatchCourseDTO.fromEntity(batchCourseRepo.save(batchCourse));
    }

    @Override
    public void delete(Long id) {
        batchCourseRepo.deleteById(id);
    }
}
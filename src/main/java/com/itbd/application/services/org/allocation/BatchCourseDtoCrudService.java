package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.org.allocation.BatchCourseDTO;
import com.itbd.application.repos.org.allocation.BatchCoordinatorRepo;
import com.itbd.application.repos.org.allocation.BatchCourseRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import dev.hilla.exception.EndpointException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@BrowserCallable
@AnonymousAllowed
public class BatchCourseDtoCrudService implements CrudService<BatchCourseDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final BatchCourseRepo batchCourseRepo;
    private final BatchCoordinatorRepo batchCoordinatorRepo;

    public BatchCourseDtoCrudService(BatchCourseRepo batchCourseRepo, BatchCoordinatorRepo batchCoordinatorRepo, JpaFilterConverter jpaFilterConverter) {
        this.batchCourseRepo = batchCourseRepo;
        this.batchCoordinatorRepo = batchCoordinatorRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull BatchCourseDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchCourseDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchCourseDAO.class)
                : Specification.anyOf();
        Page<BatchCourseDAO> persons = batchCourseRepo.findAll(spec, pageable);
        return persons.stream().map(this::populate).map(BatchCourseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchCourseDTO save(BatchCourseDTO value) throws EndpointException {
        boolean check = value.id() != null && value.id() > 0;
        BatchCourseDAO batchCourse = check
                ? batchCourseRepo.getReferenceById(value.id())
                : new BatchCourseDAO();
        if (!check && batchCourseRepo.existsBatchCourseDAOByBatchIdAndCourseId(value.batch().getId(), value.course().getId())) {
            throw new EndpointException("Batch-Course already exists");
        }
        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchCourseDTO.fromDTO(value, batchCourse);
        return BatchCourseDTO.fromEntity(populate(batchCourseRepo.save(batchCourse)));
    }

    @Override
    public void delete(Long id) {
        batchCourseRepo.deleteById(id);
    }

    private BatchCourseDAO populate(BatchCourseDAO batchCourse) {
        Set<BatchCoordinatorDAO> coordinatorDAOSet = batchCoordinatorRepo.findByBatchCourse(batchCourse).stream().map(batchCoordinator -> {
            BatchCourseDAO bc = new BatchCourseDAO();
            bc.setId(batchCourse.getId());
            bc.setVersion(batchCourse.getVersion());

            InstructorDAO instructor = batchCoordinator.getInstructor();
            PersonDAO person = instructor.getPerson();
            person.setInstructor(null);
            person.setAddress(null);
            person.setContact(null);
            person.setMedical(null);
            person.setOccupation(null);
            person.setRecord(null);

            instructor.setBatchCoordinators(null);
            instructor.setReservations(null);
            instructor.setPerson(person);

            batchCoordinator.setBatchCourse(bc);
            batchCoordinator.setInstructor(instructor);
            return batchCoordinator;
        }).collect(HashSet::new, HashSet::add, HashSet::addAll);

        batchCourse.setBatchCoordinators(coordinatorDAOSet);
        return batchCourse;
    }
}
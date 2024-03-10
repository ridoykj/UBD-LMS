package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.person.PersonDao;
import com.itbd.application.dto.org.allocation.BatchCourseDto;
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
public class BatchCourseDtoCrudService implements CrudService<BatchCourseDto, Long> {
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
    public List<@Nonnull BatchCourseDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        String hello = "41545";
        Specification<BatchCourseDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchCourseDao.class)
                : Specification.anyOf();
        Page<BatchCourseDao> persons = batchCourseRepo.findAll(spec, pageable);
        return persons.stream().map(this::populate).map(BatchCourseDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchCourseDto save(BatchCourseDto value) throws EndpointException {
        boolean check = value.id() != null && value.id() > 0;
        BatchCourseDao batchCourse = check
                ? batchCourseRepo.getReferenceById(value.id())
                : new BatchCourseDao();
        if (!check && batchCourseRepo.existsBatchCourseDAOByBatchIdAndCourseId(value.batch().getId(), value.course().getId())) {
            throw new EndpointException("Batch-Course already exists");
        }
        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchCourseDto.fromDTO(value, batchCourse);
        return BatchCourseDto.fromEntity(populate(batchCourseRepo.save(batchCourse)));
    }

    @Override
    public void delete(Long id) {
        batchCourseRepo.deleteById(id);
    }

    private BatchCourseDao populate(BatchCourseDao batchCourse) {
        Set<BatchCoordinatorDao> coordinatorDAOSet = batchCoordinatorRepo.findByBatchCourse(batchCourse).stream().map(batchCoordinator -> {
            BatchCourseDao bc = new BatchCourseDao();
            bc.setId(batchCourse.getId());
            bc.setVersion(batchCourse.getVersion());

            InstructorDao instructor = batchCoordinator.getInstructor();
            PersonDao person = instructor.getPerson();
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
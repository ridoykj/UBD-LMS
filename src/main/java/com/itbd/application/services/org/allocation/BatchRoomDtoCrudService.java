package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.org.allocation.BatchRoomDao;
import com.itbd.application.dao.org.edu.CourseDao;
import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.person.PersonDao;
import com.itbd.application.dto.org.allocation.BatchRoomDto;
import com.itbd.application.repos.org.allocation.BatchCoordinatorRepo;
import com.itbd.application.repos.org.allocation.BatchRoomRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@BrowserCallable
@AnonymousAllowed
public class BatchRoomDtoCrudService implements CrudService<BatchRoomDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final BatchRoomRepo batchRoomRepo;
    private final BatchCoordinatorRepo batchCoordinatorRepo;

    public BatchRoomDtoCrudService(BatchRoomRepo batchRoomRepo,BatchCoordinatorRepo batchCoordinatorRepo, JpaFilterConverter jpaFilterConverter) {
        this.batchRoomRepo = batchRoomRepo;
        this.batchCoordinatorRepo = batchCoordinatorRepo;
        this.jpaFilterConverter = jpaFilterConverter;
    }

    @Override
    @Nonnull
    public List<@Nonnull BatchRoomDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchRoomDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchRoomDao.class)
                : Specification.anyOf();
//            Page<BatchRoomDAO> persons = batchRoomRepo.findAll(spec, pageable);
            List<BatchRoomDao> persons = batchRoomRepo.findAll(spec);
        return persons.stream().map(this::populate).map(BatchRoomDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchRoomDto save(BatchRoomDto value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchRoomDao batchCourse = check
                ? batchRoomRepo.getReferenceById(value.id())
                : new BatchRoomDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchRoomDto.fromDTO(value, batchCourse);
        return BatchRoomDto.fromEntity(populate(batchRoomRepo.save(batchCourse)));
    }

    @Override
    public void delete(Long id) {
        batchRoomRepo.deleteById(id);
    }

    private BatchRoomDao populate(BatchRoomDao batchRoom) {
        BatchCourseDao batchCourse = batchRoom.getBatchCourse();
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

        CourseDao course = batchCourse.getCourse();
        course.setBatchCourses(null);
        batchCourse.setCourse(course);
        batchCourse.setBatch(null);
        batchCourse.setBatchCoordinators(coordinatorDAOSet);
        batchRoom.setBatchCourse(batchCourse);

        return batchRoom;
    }
}
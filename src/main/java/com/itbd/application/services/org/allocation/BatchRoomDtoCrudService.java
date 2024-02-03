package com.itbd.application.services.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.allocation.BatchRoomDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.place.BuildingDAO;
import com.itbd.application.dao.org.place.FloorDAO;
import com.itbd.application.dao.org.place.RoomDAO;
import com.itbd.application.dao.org.place.SectorDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import com.itbd.application.dto.org.allocation.BatchRoomDTO;
import com.itbd.application.repos.org.allocation.BatchCoordinatorRepo;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@BrowserCallable
@AnonymousAllowed
public class BatchRoomDtoCrudService implements CrudService<BatchRoomDTO, Long> {
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
    public List<@Nonnull BatchRoomDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchRoomDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchRoomDAO.class)
                : Specification.anyOf();
//            Page<BatchRoomDAO> persons = batchRoomRepo.findAll(spec, pageable);
            List<BatchRoomDAO> persons = batchRoomRepo.findAll(spec);
        return persons.stream().map(this::populate).map(BatchRoomDTO::fromEntity).toList();
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
        return BatchRoomDTO.fromEntity(populate(batchRoomRepo.save(batchCourse)));
    }

    @Override
    public void delete(Long id) {
        batchRoomRepo.deleteById(id);
    }

    private BatchRoomDAO populate(BatchRoomDAO batchRoom) {
        BatchCourseDAO batchCourse = batchRoom.getBatchCourse();
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


        CourseDAO course = batchCourse.getCourse();
        course.setBatchCourses(null);
        batchCourse.setCourse(course);
        batchCourse.setBatch(null);
        batchCourse.setBatchCoordinators(coordinatorDAOSet);
        batchRoom.setBatchCourse(batchCourse);

        return batchRoom;
    }
}
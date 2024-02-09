package com.itbd.application.dto.org.allocation;

import com.itbd.application.constants.enums.CoordinatorTypeEnum;
import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.user.InstructorDAO;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;

public record BatchCoordinatorDTO(
       @Id Long id,
        @Version Long version,
        CoordinatorTypeEnum type,
        BatchCourseDAO batchCourse,
        InstructorDAO instructor
) {


    public static BatchCoordinatorDTO fromEntity(BatchCoordinatorDAO batchCoordinator) {
        BatchCourseDAO batchCourse = batchCoordinator.getBatchCourse();
        InstructorDAO instructor = batchCoordinator.getInstructor();

        batchCourse.setBatch(null);
        batchCourse.setCourse(null);
        batchCourse.setBatchCoordinators(null);

        instructor.setBatchCoordinators(null);
        instructor.setReservations(null);
        instructor.setPerson(null);

        batchCoordinator.setBatchCourse(batchCourse);
        batchCoordinator.setInstructor(instructor);

        return new BatchCoordinatorDTO(
                batchCoordinator.getId(),
                batchCoordinator.getVersion(),
                batchCoordinator.getType(),
                batchCoordinator.getBatchCourse(),
                batchCoordinator.getInstructor()
        );
    }

    public static void fromDTO(BatchCoordinatorDTO value, BatchCoordinatorDAO batchCoordinator) {
        batchCoordinator.setId(value.id());
        batchCoordinator.setVersion(value.version());
        batchCoordinator.setType(value.type());
        batchCoordinator.setBatchCourse(value.batchCourse());
        batchCoordinator.setInstructor(value.instructor());
    }

}

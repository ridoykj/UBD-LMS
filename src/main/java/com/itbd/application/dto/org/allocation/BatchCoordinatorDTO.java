package com.itbd.application.dto.org.allocation;

import com.itbd.application.constants.enums.CoordinatorTypeEnum;
import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.user.InstructorDao;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;

public record BatchCoordinatorDto(
       @Id Long id,
        @Version Long version,
        CoordinatorTypeEnum type,
        BatchCourseDao batchCourse,
        InstructorDao instructor
) {


    public static BatchCoordinatorDto fromEntity(BatchCoordinatorDao batchCoordinator) {
        BatchCourseDao batchCourse = batchCoordinator.getBatchCourse();
        InstructorDao instructor = batchCoordinator.getInstructor();

        batchCourse.setBatch(null);
        batchCourse.setCourse(null);
        batchCourse.setBatchCoordinators(null);

        instructor.setBatchCoordinators(null);
        instructor.setReservations(null);
        instructor.setPerson(null);

        batchCoordinator.setBatchCourse(batchCourse);
        batchCoordinator.setInstructor(instructor);

        return new BatchCoordinatorDto(
                batchCoordinator.getId(),
                batchCoordinator.getVersion(),
                batchCoordinator.getType(),
                batchCoordinator.getBatchCourse(),
                batchCoordinator.getInstructor()
        );
    }

    public static void fromDTO(BatchCoordinatorDto value, BatchCoordinatorDao batchCoordinator) {
        batchCoordinator.setId(value.id());
        batchCoordinator.setVersion(value.version());
        batchCoordinator.setType(value.type());
        batchCoordinator.setBatchCourse(value.batchCourse());
        batchCoordinator.setInstructor(value.instructor());
    }

}

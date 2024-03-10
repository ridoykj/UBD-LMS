package com.itbd.application.dto.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDao;
import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dao.org.edu.CourseDao;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public record BatchCourseDto(
        @Id Long id,
        @Version Long version,
        String name,
        String code,
        String prerequisites,
        String headline,
        Long semester,
        String about,
        BigDecimal numberOfCredits,
        BigDecimal numberOfLecture,
        BigDecimal numberOfTutorial,
        String type,
        BigDecimal duration,
        String durationUnit,
        CourseDao course,
        BatchDao batch,
        Set<BatchCoordinatorDao> batchCoordinators
) {
    public static BatchCourseDto fromEntity(BatchCourseDao batchCourse) {
        BatchDao batch = batchCourse.getBatch();
        CourseDao course = batchCourse.getCourse();

        batch.setProgramme(null);
        batch.setReservations(null);
        batch.setStudents(null);

        batch.setBatchCourses(null);
        course.setBatchCourses(null);

        batchCourse.setBatch(batch);
        batchCourse.setCourse(course);
        return new BatchCourseDto(
                batchCourse.getId(),
                batchCourse.getVersion(),
                batchCourse.getName(),
                batchCourse.getCode(),
                batchCourse.getPrerequisites(),
                batchCourse.getHeadline(),
                batchCourse.getSemester(),
                batchCourse.getAbout(),
                batchCourse.getNumberOfCredits(),
                batchCourse.getNumberOfLecture(),
                batchCourse.getNumberOfTutorial(),
                batchCourse.getType(),
                batchCourse.getDuration(),
                batchCourse.getDurationUnit(),
                batchCourse.getCourse(),
                batchCourse.getBatch(),
                batchCourse.getBatchCoordinators()
        );
    }

    public static void fromDTO(BatchCourseDto value, BatchCourseDao batchCourse) {
        batchCourse.setId(value.id());
        batchCourse.setVersion(value.version());
        batchCourse.setName(value.name());
        batchCourse.setCode(value.code());
        batchCourse.setPrerequisites(value.prerequisites());
        batchCourse.setHeadline(value.headline());
        batchCourse.setSemester(value.semester());
        batchCourse.setAbout(value.about());
        batchCourse.setNumberOfCredits(value.numberOfCredits());
        batchCourse.setNumberOfLecture(value.numberOfLecture());
        batchCourse.setNumberOfTutorial(value.numberOfTutorial());
        batchCourse.setType(value.type());
        batchCourse.setDuration(value.duration());
        batchCourse.setDurationUnit(value.durationUnit());

        BatchDao batch = value.batch() != null ? value.batch() : new BatchDao();
        CourseDao course = value.course() != null ? value.course() : new CourseDao();
        Set<BatchCoordinatorDao> batchCoordinators = value.batchCoordinators() != null ? value.batchCoordinators() : new HashSet<>();

        batch.setBatchCourses(batch.getBatchCourses() != null ? batch.getBatchCourses() : new HashSet<>());
        course.setBatchCourses(course.getBatchCourses() != null ? course.getBatchCourses() : new HashSet<>());

        batchCourse.setBatchCoordinators(batchCoordinators.stream().map(batchCoordinator -> {
            batchCoordinator.setBatchCourse(batchCourse);
            return batchCoordinator;
        }).collect(Collectors.toSet()));

        batch.getBatchCourses().add(batchCourse);
        course.getBatchCourses().add(batchCourse);

        batchCourse.setBatch(batch);
        batchCourse.setCourse(course);
    }
}

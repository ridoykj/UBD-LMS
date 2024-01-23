package com.itbd.application.dto.org.allocation;

import com.itbd.application.dao.org.allocation.BatchCoordinatorDAO;
import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.PersonDAO;
import org.springframework.data.annotation.Version;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

public record BatchCourseDTO(
        Long id,
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
        CourseDAO course,
        BatchDAO batch,
        Set<BatchCoordinatorDAO> batchCoordinators
) {


    public static BatchCourseDTO fromEntity(BatchCourseDAO batchCourse) {
        BatchDAO batch = batchCourse.getBatch();
        CourseDAO course = batchCourse.getCourse();
//        Set<BatchCoordinatorDAO> batchCoordinators = batchCourse.getBatchCoordinators();

        batch.setProgramme(null);
        batch.setReservations(null);
        batch.setStudents(null);

        batch.setBatchCourses(null);
        course.setBatchCourses(null);

        batchCourse.setBatch(batch);
        batchCourse.setCourse(course);
//        batchCourse.setBatchCoordinators(batchCoordinators.stream().map(batchCoordinator -> {
//            BatchCourseDAO bc = new BatchCourseDAO();
//            bc.setId(batchCourse.getId());
//            bc.setVersion(batchCourse.getVersion());
//
//            InstructorDAO instructor = batchCoordinator.getInstructor();
//            PersonDAO person = instructor.getPerson();
//            person.setInstructor(null);
//            person.setAddress(null);
//            person.setContact(null);
//            person.setMedical(null);
//            person.setOccupation(null);
//            person.setRecord(null);
//
//            instructor.setBatchCoordinators(null);
//            instructor.setReservations(null);
//            instructor.setPerson(person);
//
//            batchCoordinator.setBatchCourse(bc);
//            batchCoordinator.setInstructor(instructor);
//            return batchCoordinator;
//        }).collect(HashSet::new, HashSet::add, HashSet::addAll));
        return new BatchCourseDTO(
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

    public static void fromDTO(BatchCourseDTO value, BatchCourseDAO batchCourse) {
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

        BatchDAO batch = value.batch() != null ? value.batch() : new BatchDAO();
        CourseDAO course = value.course() != null ? value.course() : new CourseDAO();

        batch.setBatchCourses(batch.getBatchCourses() != null ? batch.getBatchCourses() : new HashSet<>());
        course.setBatchCourses(course.getBatchCourses() != null ? course.getBatchCourses() : new HashSet<>());

        batchCourse.setBatchCoordinators(value.batchCoordinators() != null ? value.batchCoordinators() : new HashSet<>());
        batch.getBatchCourses().add(batchCourse);
        course.getBatchCourses().add(batchCourse);

        batchCourse.setBatch(batch);
        batchCourse.setCourse(course);
    }

}

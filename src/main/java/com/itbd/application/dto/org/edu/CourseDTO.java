package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.allocation.BatchCourseDAO;
import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dao.org.edu.ReservationDAO;
import org.springframework.data.annotation.Version;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record CourseDTO(
        Long id,
        @Version Long version,
        String name,
        String code,
        String prerequisites,
        String headline,
        String about,
        String type,
        String level,
        String language,
        String category,
        String subCategory,
        BigDecimal duration,
        String durationUnit,
        Set<BatchCourseDAO> batchCourses) {


    public static CourseDTO fromEntity(CourseDAO course) {
        course.setBatchCourses(null);
        return new CourseDTO(
                course.getId(),
                course.getVersion(),
                course.getName(),
                course.getCode(),
                course.getPrerequisites(),
                course.getHeadline(),
                course.getAbout(),
                course.getType(),
                course.getLevel(),
                course.getLanguage(),
                course.getCategory(),
                course.getSubCategory(),
                course.getDuration(),
                course.getDurationUnit(),
                course.getBatchCourses()
               );
    }

    public static void fromDTO(CourseDTO courseDTO, CourseDAO courseDAO) {
        courseDAO.setId(courseDTO.id());
        courseDAO.setVersion(courseDTO.version());
        courseDAO.setName(courseDTO.name());
        courseDAO.setCode(courseDTO.code());
        courseDAO.setPrerequisites(courseDTO.prerequisites());
        courseDAO.setHeadline(courseDTO.headline());
        courseDAO.setAbout(courseDTO.about());
        courseDAO.setType(courseDTO.type());
        courseDAO.setLevel(courseDTO.level());
        courseDAO.setLanguage(courseDTO.language());
        courseDAO.setCategory(courseDTO.category());
        courseDAO.setSubCategory(courseDTO.subCategory());
        courseDAO.setDuration(courseDTO.duration());
        courseDAO.setDurationUnit(courseDTO.durationUnit());
        courseDAO.setBatchCourses(courseDTO.batchCourses());
    }

}

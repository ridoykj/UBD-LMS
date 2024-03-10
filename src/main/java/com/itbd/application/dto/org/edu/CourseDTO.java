package com.itbd.application.dto.org.edu;

import com.itbd.application.dao.org.allocation.BatchCourseDao;
import com.itbd.application.dao.org.edu.CourseDao;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Version;

import java.math.BigDecimal;
import java.util.Set;

public record CourseDto(
        Long id,
        @Version Long version,
        @NotNull @NotEmpty String name,
        @NotNull @NotEmpty String code,
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
        Set<BatchCourseDao> batchCourses) {


    public static CourseDto fromEntity(CourseDao course) {
        course.setBatchCourses(null);
        return new CourseDto(
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

    public static void fromDTO(CourseDto courseDTO, CourseDao courseDAO) {
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

package com.itbd.application.dto.org.academic;

import com.itbd.application.dao.org.academic.SectionDAO;
import org.springframework.data.annotation.Version;

public record SectionDTO(
        Long id,
        @Version Long version,
        String name,
        Long classId,
        Long instructorId,
        Long studentId,
        Long courseId,
        Long buildingId,
        Long roomId,
        Long blockId,
        Long floorId,
        Long sessionId,
        Long termId,
        Long batchId,
        Long departmentId,
        Long sectionId,
        Long shiftId,
        Long groupId,
        Long semesterId,
        Long academicYearId,
        Long academicSessionId,
        Long academicTermId) {

    public static SectionDTO fromEntity(SectionDAO section) {
        return new SectionDTO(
                section.getId(),
                section.getVersion(),
                section.getName(),
                section.getClassId(),
                section.getInstructorId(),
                section.getStudentId(),
                section.getCourseId(),
                section.getBuildingId(),
                section.getRoomId(),
                section.getBlockId(),
                section.getFloorId(),
                section.getSessionId(),
                section.getTermId(),
                section.getBatchId(),
                section.getDepartmentId(),
                section.getSectionId(),
                section.getShiftId(),
                section.getGroupId(),
                section.getSemesterId(),
                section.getAcademicYearId(),
                section.getAcademicSessionId(),
                section.getAcademicTermId());
    }

    public static void fromDTO(SectionDTO sectionDTO, SectionDAO sectionDAO) {
        sectionDAO.setId(sectionDTO.id());
        sectionDAO.setVersion(sectionDTO.version());
        sectionDAO.setName(sectionDTO.name());
        sectionDAO.setClassId(sectionDTO.classId());
        sectionDAO.setInstructorId(sectionDTO.instructorId());
        sectionDAO.setStudentId(sectionDTO.studentId());
        sectionDAO.setCourseId(sectionDTO.courseId());
        sectionDAO.setBuildingId(sectionDTO.buildingId());
        sectionDAO.setRoomId(sectionDTO.roomId());
        sectionDAO.setBlockId(sectionDTO.blockId());
        sectionDAO.setFloorId(sectionDTO.floorId());
        sectionDAO.setSessionId(sectionDTO.sessionId());
        sectionDAO.setTermId(sectionDTO.termId());
        sectionDAO.setBatchId(sectionDTO.batchId());
        sectionDAO.setDepartmentId(sectionDTO.departmentId());
        sectionDAO.setSectionId(sectionDTO.sectionId());
        sectionDAO.setShiftId(sectionDTO.shiftId());
        sectionDAO.setGroupId(sectionDTO.groupId());
        sectionDAO.setSemesterId(sectionDTO.semesterId());
        sectionDAO.setAcademicYearId(sectionDTO.academicYearId());
        sectionDAO.setAcademicSessionId(sectionDTO.academicSessionId());
        sectionDAO.setAcademicTermId(sectionDTO.academicTermId());
    }

}

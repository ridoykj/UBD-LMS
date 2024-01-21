package com.itbd.application.dto.org.academic;

import com.itbd.application.dao.org.academic.AttendanceDAO;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record AttendanceDTO(
        Long id,
        @Version Long version,
        Long registrationId,
        LocalDateTime inTime,
        LocalDateTime outTime,
        Double stayingHour,
        String status,
        Boolean present) {

    public static AttendanceDTO fromEntity(AttendanceDAO attendance) {
        return new AttendanceDTO(
                attendance.getId(),
                attendance.getVersion(),
                attendance.getRegistrationId(),
                attendance.getInTime(),
                attendance.getOutTime(),
                attendance.getStayingHour(),
                attendance.getStatus(),
                attendance.getPresent());
    }

    public static void fromDTO(AttendanceDTO attendanceDTO, AttendanceDAO attendanceDAO) {
        attendanceDAO.setId(attendanceDTO.id());
        attendanceDAO.setVersion(attendanceDTO.version());
        attendanceDAO.setRegistrationId(attendanceDTO.registrationId());
        attendanceDAO.setInTime(attendanceDTO.inTime());
        attendanceDAO.setOutTime(attendanceDTO.outTime());
        attendanceDAO.setStayingHour(attendanceDTO.stayingHour());
        attendanceDAO.setStatus(attendanceDTO.status());
        attendanceDAO.setPresent(attendanceDTO.present());
    }
}

package com.itbd.application.dao.org.academic;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_aca_section")
@Getter
@Setter
public class SectionDAO  extends AbstractEntity<Long>{
    @Id
    @Column(name = "id_section_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(name = "id_class_key")
    private Long classId;

    @Column(name = "id_instructor_key")
    private Long instructorId;

    @Column(name = "id_student_key")
    private Long studentId;

    @Column(name = "id_course_key")
    private Long courseId;

    @Column(name = "id_building_key")
    private Long buildingId;

    @Column(name = "id_room_key")
    private Long roomId;

    @Column(name = "id_block_key")
    private Long blockId;

    @Column(name = "id_floor_key")
    private Long floorId;

    @Column(name = "id_session_key")
    private Long sessionId;

    @Column(name = "id_term_key")
    private Long termId;

    @Column(name = "id_batch_key")
    private Long batchId;

    @Column(name = "id_department_key")
    private Long departmentId;

    @Column(name = "id_section")
    private Long sectionId;

    @Column(name = "id_shift_key")
    private Long shiftId;

    @Column(name = "id_group_key")
    private Long groupId;

    @Column(name = "id_semester_key")
    private Long semesterId;

    @Column(name = "id_academic_year_key")
    private Long academicYearId;

    @Column(name = "id_academic_session_key")
    private Long academicSessionId;

    @Column(name = "id_academic_term_key")
    private Long academicTermId;

    

}

package com.itbd.application.dao.org.edu;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.itbd.application.dao.user.StudentDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_edu_batch")
@Getter
@Setter
public class BatchDAO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_batch_key", nullable = false, updatable = false)
    private Long id;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_code")
    private String code;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_status")
    private String status;
    @Column(name = "tx_session")
    private String session;

    @Column(name = "dt_graduation_date")
    private LocalDate graduationDate;

    @Column(name = "dt_start")
    private LocalDate startDate;

    @Column(name = "dt_end")
    private LocalDate endDate;

    @Column(name = "dtt_admission_start")
    private LocalDateTime admissionStartDate;

    @Column(name = "dtt_admission_end")
    private LocalDateTime admissionEndDate;

    @Column(name = "ct_students")
    private Long numberOfStudents;

    @Column(name = "ct_lectures")
    private Long numberOfLecture;

    @Column(name = "ct_tutorials")
    private Long numberOfTutorial;

    @Column(name = "ct_practicals")
    private Long numberOfPractical;

    @Column(name = "ct_credits")
    private Long numberOfCredits;

    @Column(name = "ct_semesters")
    private Long numberOfSemester;

    @ManyToOne
    @JoinColumn(name = "id_programme_key")
    private ProgrammeDAO programme;

    @OneToMany(mappedBy = "batch")
    private List<ReservationDAO> reservations;

    @OneToMany(mappedBy = "batch")
    private List<StudentDAO> students;
}
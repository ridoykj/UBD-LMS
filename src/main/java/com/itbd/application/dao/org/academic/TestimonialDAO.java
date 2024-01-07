package com.itbd.application.dao.org.academic;

import java.time.LocalDateTime;

import com.itbd.application.constants.TestimonialTypeEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_aca_testimonial")
@Getter
@Setter
public class TestimonialDAO {

    @Id
    @Column(name = "id_testimonial_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String testimonial;

    @Column
    private String testimonialBy;

    @Column
    private LocalDateTime testimonialDate;

    @Enumerated(EnumType.STRING)
    private TestimonialTypeEnum type;

    @Column
    private String status;

    @Column
    private String remarks;

    @Column
    private String attachment;
}

package com.itbd.application.dao.org.academic;

import com.itbd.application.constants.enums.TestimonialTypeEnum;
import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "t_aca_testimonial")
@Getter
@Setter
public class TestimonialDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_testimonial_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_testimonial_ver", nullable = false)
    private Long version;

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

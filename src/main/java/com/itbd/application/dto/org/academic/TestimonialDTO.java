package com.itbd.application.dto.org.academic;

import com.itbd.application.constants.enums.TestimonialTypeEnum;
import com.itbd.application.dao.org.academic.TestimonialDao;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

public record TestimonialDto(
        Long id,
        @Version Long version,
        String testimonial,
        String testimonialBy,
        LocalDateTime testimonialDate,
        TestimonialTypeEnum type,
        String status,
        String remarks,
        String attachment) {

    public static TestimonialDto fromEntity(TestimonialDao testimonial) {
        return new TestimonialDto(
                testimonial.getId(),
                testimonial.getVersion(),
                testimonial.getTestimonial(),
                testimonial.getTestimonialBy(),
                testimonial.getTestimonialDate(),
                testimonial.getType(),
                testimonial.getStatus(),
                testimonial.getRemarks(),
                testimonial.getAttachment());
    }

    public static void fromDTO(TestimonialDto testimonialDTO, TestimonialDao testimonialDAO) {
        testimonialDAO.setId(testimonialDTO.id());
        testimonialDAO.setVersion(testimonialDTO.version());
        testimonialDAO.setTestimonial(testimonialDTO.testimonial());
        testimonialDAO.setTestimonialBy(testimonialDTO.testimonialBy());
        testimonialDAO.setTestimonialDate(testimonialDTO.testimonialDate());
        testimonialDAO.setType(testimonialDTO.type());
        testimonialDAO.setStatus(testimonialDTO.status());
        testimonialDAO.setRemarks(testimonialDTO.remarks());
        testimonialDAO.setAttachment(testimonialDTO.attachment());
    }

}

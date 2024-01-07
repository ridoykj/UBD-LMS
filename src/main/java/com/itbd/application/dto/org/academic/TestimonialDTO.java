package com.itbd.application.dto.org.academic;

import java.time.LocalDateTime;

import com.itbd.application.constants.TestimonialTypeEnum;
import com.itbd.application.dao.org.academic.TestimonialDAO;

public record TestimonialDTO(
        Long id,
        String testimonial,
        String testimonialBy,
        LocalDateTime testimonialDate,
        TestimonialTypeEnum type,
        String status,
        String remarks,
        String attachment) {

    public static TestimonialDTO fromEntity(TestimonialDAO testimonial) {
        return new TestimonialDTO(
                testimonial.getId(),
                testimonial.getTestimonial(),
                testimonial.getTestimonialBy(),
                testimonial.getTestimonialDate(),
                testimonial.getType(),
                testimonial.getStatus(),
                testimonial.getRemarks(),
                testimonial.getAttachment());
    }

    public static void fromDTO(TestimonialDTO testimonialDTO, TestimonialDAO testimonialDAO) {
        testimonialDAO.setId(testimonialDTO.id());
        testimonialDAO.setTestimonial(testimonialDTO.testimonial());
        testimonialDAO.setTestimonialBy(testimonialDTO.testimonialBy());
        testimonialDAO.setTestimonialDate(testimonialDTO.testimonialDate());
        testimonialDAO.setType(testimonialDTO.type());
        testimonialDAO.setStatus(testimonialDTO.status());
        testimonialDAO.setRemarks(testimonialDTO.remarks());
        testimonialDAO.setAttachment(testimonialDTO.attachment());
    }

}

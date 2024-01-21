package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.org.academic.TestimonialDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TestimonialRepo extends JpaRepository<TestimonialDAO, Long>, JpaSpecificationExecutor<TestimonialDAO> {

}

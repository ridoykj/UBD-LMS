package com.itbd.application.repos.org.academic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.itbd.application.dao.org.academic.TestimonialDAO;

public interface TestimonialRepo  extends JpaRepository<TestimonialDAO, Long> , JpaSpecificationExecutor<TestimonialDAO>{
    
}

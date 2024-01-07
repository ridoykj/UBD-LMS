package com.itbd.application.services.org.academic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.academic.TestimonialDAO;
import com.itbd.application.dto.org.academic.TestimonialDTO;
import com.itbd.application.repos.org.academic.TestimonialRepo;
import com.itbd.application.repos.user.AddressRepo;
import com.itbd.application.repos.user.ContactRepo;
import com.itbd.application.repos.user.DocumentRecordsRepo;
import com.itbd.application.repos.user.MedicalRepo;
import com.itbd.application.repos.user.OccupationRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class TestimonialDtoCrudService implements CrudService<TestimonialDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private TestimonialRepo personRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private ContactRepo contactRepo;
    @Autowired
    private DocumentRecordsRepo documentRecordsRepo;
    @Autowired
    private MedicalRepo medicalRepo;
    @Autowired
    private OccupationRepo occupationRepo;

    // public PersonMargeDtoCrudService(TestimonialRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull TestimonialDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<TestimonialDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, TestimonialDAO.class)
                : Specification.anyOf();
        Page<TestimonialDAO> persons = personRepo.findAll(spec, pageable);
       return persons.stream().map(TestimonialDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable TestimonialDTO save(TestimonialDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        TestimonialDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new TestimonialDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        TestimonialDTO.fromDTO(value, person);
        return TestimonialDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
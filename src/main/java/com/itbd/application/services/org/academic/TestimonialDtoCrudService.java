package com.itbd.application.services.org.academic;

import com.itbd.application.dao.org.academic.TestimonialDao;
import com.itbd.application.dto.org.academic.TestimonialDto;
import com.itbd.application.repos.org.academic.TestimonialRepo;
import com.itbd.application.repos.user.person.*;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class TestimonialDtoCrudService implements CrudService<TestimonialDto, Long> {

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
    public List<@Nonnull TestimonialDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<TestimonialDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, TestimonialDao.class)
                : Specification.anyOf();
        Page<TestimonialDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(TestimonialDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable TestimonialDto save(TestimonialDto value) {
        boolean check = value.id() != null && value.id() > 0;
        TestimonialDao person = check
                ? personRepo.getReferenceById(value.id())
                : new TestimonialDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        TestimonialDto.fromDTO(value, person);
        return TestimonialDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
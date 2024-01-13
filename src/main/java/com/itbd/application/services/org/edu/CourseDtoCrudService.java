package com.itbd.application.services.org.edu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dto.org.edu.CourseDTO;
import com.itbd.application.repos.org.edu.CourseRepo;
import com.itbd.application.repos.user.person.AddressRepo;
import com.itbd.application.repos.user.person.ContactRepo;
import com.itbd.application.repos.user.person.DocumentRecordsRepo;
import com.itbd.application.repos.user.person.MedicalRepo;
import com.itbd.application.repos.user.person.OccupationRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class CourseDtoCrudService implements CrudService<CourseDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private CourseRepo personRepo;
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

    // public PersonMargeDtoCrudService(CourseRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull CourseDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<CourseDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, CourseDAO.class)
                : Specification.anyOf();
        Page<CourseDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(c -> {
            ProgrammeDAO programme = c.getProgramme();
            programme.setDepartment(null);
            programme.setBatches(null);
            programme.setCourses(null);
            c.setProgramme(programme);
            c.setReservations(null);
            return c;
        }).map(CourseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable CourseDTO save(CourseDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        CourseDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new CourseDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        CourseDTO.fromDTO(value, person);
        return CourseDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
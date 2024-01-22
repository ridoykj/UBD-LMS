package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.CourseDAO;
import com.itbd.application.dto.org.edu.CourseDTO;
import com.itbd.application.repos.org.edu.CourseRepo;
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
public class CourseDtoCrudService implements CrudService<CourseDTO, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private CourseRepo courseRepo;

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
        Page<CourseDAO> persons = courseRepo.findAll(spec, pageable);
        return persons.stream().map(CourseDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable CourseDTO save(CourseDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        CourseDAO person = check
                ? courseRepo.getReferenceById(value.id())
                : new CourseDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        CourseDTO.fromDTO(value, person);
        return CourseDTO.fromEntity(courseRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        courseRepo.deleteById(id);
    }
}
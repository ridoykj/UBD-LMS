package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.CourseDao;
import com.itbd.application.dto.org.edu.CourseDto;
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
public class CourseDtoCrudService implements CrudService<CourseDto, Long> {

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
    public List<@Nonnull CourseDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<CourseDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, CourseDao.class)
                : Specification.anyOf();
        Page<CourseDao> persons = courseRepo.findAll(spec, pageable);
        return persons.stream().map(CourseDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable CourseDto save(CourseDto value) {
        boolean check = value.id() != null && value.id() > 0;
        CourseDao person = check
                ? courseRepo.getReferenceById(value.id())
                : new CourseDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        CourseDto.fromDTO(value, person);
        return CourseDto.fromEntity(courseRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        courseRepo.deleteById(id);
    }
}
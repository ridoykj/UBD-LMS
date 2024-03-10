package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.academic.OrganizationDao;
import com.itbd.application.dao.org.edu.DepartmentDao;
import com.itbd.application.dto.org.edu.DepartmentDto;
import com.itbd.application.repos.org.edu.DepartmentRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
@Slf4j
public class DepartmentDtoCrudService implements CrudService<DepartmentDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final DepartmentRepo personRepo;

    public DepartmentDtoCrudService(JpaFilterConverter jpaFilterConverter, DepartmentRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull DepartmentDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDao.class)
                : Specification.anyOf();
        Page<DepartmentDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(d -> {
            OrganizationDao organization = d.getOrganization();
            organization.setDepartments(null);
            d.setOrganization(organization);
            // d.setProgrammes(List.of());
            d.setProgrammes(null);
            return d;
        }).map(DepartmentDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable DepartmentDto save(DepartmentDto value) {
        boolean check = value.id() != null && value.id() > 0;
        DepartmentDao person = check
                ? personRepo.getReferenceById(value.id())
                : new DepartmentDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        DepartmentDto.fromDTO(value, person);
        return DepartmentDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }

    public Page<DepartmentDao> lazyList(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDao.class)
                : Specification.anyOf();
        return personRepo.findAll(spec, pageable);
    }
}
package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.DepartmentDao;
import com.itbd.application.dao.org.edu.ProgrammeDao;
import com.itbd.application.dto.org.edu.ProgrammeDto;
import com.itbd.application.repos.org.edu.ProgrammeRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class ProgrammeDtoCrudService implements CrudService<ProgrammeDto, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final ProgrammeRepo personRepo;

    public ProgrammeDtoCrudService(JpaFilterConverter jpaFilterConverter, ProgrammeRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull ProgrammeDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<ProgrammeDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, ProgrammeDao.class)
                : Specification.anyOf();
        Page<ProgrammeDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(p -> {
            DepartmentDao department = p.getDepartment();
            // OrganizationDAO organization = department.getOrganization();
            // department.setOrganization(organization);
            department.setProgrammes(null);
            department.setOrganization(null);
            p.setDepartment(department);
            p.setBatches(null);
            return p;
        }).map(ProgrammeDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable ProgrammeDto save(ProgrammeDto value) {
        boolean check = value.id() != null && value.id() > 0;
        ProgrammeDao person = check
                ? personRepo.getReferenceById(value.id())
                : new ProgrammeDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        ProgrammeDto.fromDTO(value, person);
        return ProgrammeDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
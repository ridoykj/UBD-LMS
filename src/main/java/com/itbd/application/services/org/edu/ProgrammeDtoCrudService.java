package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dao.org.edu.ProgrammeDAO;
import com.itbd.application.dto.org.edu.ProgrammeDTO;
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
public class ProgrammeDtoCrudService implements CrudService<ProgrammeDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final ProgrammeRepo personRepo;

    public ProgrammeDtoCrudService(JpaFilterConverter jpaFilterConverter, ProgrammeRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull ProgrammeDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<ProgrammeDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, ProgrammeDAO.class)
                : Specification.anyOf();
        Page<ProgrammeDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(p -> {
            DepartmentDAO department = p.getDepartment();
            // OrganizationDAO organization = department.getOrganization();
            // department.setOrganization(organization);
            department.setProgrammes(null);
            department.setOrganization(null);
            p.setDepartment(department);
            p.setBatches(null);
            p.setCourses(null);
            return p;
        }).map(ProgrammeDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable ProgrammeDTO save(ProgrammeDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        ProgrammeDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new ProgrammeDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        ProgrammeDTO.fromDTO(value, person);
        return ProgrammeDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
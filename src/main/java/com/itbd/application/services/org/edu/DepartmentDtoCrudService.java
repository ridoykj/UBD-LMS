package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import com.itbd.application.dto.org.edu.DepartmentDTO;
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
public class DepartmentDtoCrudService implements CrudService<DepartmentDTO, Long> {
    private final JpaFilterConverter jpaFilterConverter;
    private final DepartmentRepo personRepo;

    public DepartmentDtoCrudService(JpaFilterConverter jpaFilterConverter, DepartmentRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull DepartmentDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDAO.class)
                : Specification.anyOf();
        Page<DepartmentDAO> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(d -> {
            OrganizationDAO organization = d.getOrganization();
            organization.setDepartments(null);
            d.setOrganization(organization);
            // d.setProgrammes(List.of());
            d.setProgrammes(null);
            return d;
        }).map(DepartmentDTO::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable DepartmentDTO save(DepartmentDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        DepartmentDAO person = check
                ? personRepo.getReferenceById(value.id())
                : new DepartmentDAO();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        DepartmentDTO.fromDTO(value, person);
        return DepartmentDTO.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }

    public Page<DepartmentDAO> lazyList(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<DepartmentDAO> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, DepartmentDAO.class)
                : Specification.anyOf();
        return personRepo.findAll(spec, pageable);
    }
}
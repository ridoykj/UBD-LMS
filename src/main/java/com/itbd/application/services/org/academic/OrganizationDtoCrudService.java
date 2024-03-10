package com.itbd.application.services.org.academic;

import com.itbd.application.dao.org.academic.OrganizationDao;
import com.itbd.application.dto.custom.IDashBoardRptDto;
import com.itbd.application.dto.org.academic.OrganizationDto;
import com.itbd.application.repos.org.academic.OrganizationRepo;
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
public class OrganizationDtoCrudService implements CrudService<OrganizationDto, Long> {

    private final JpaFilterConverter jpaFilterConverter;
    private final OrganizationRepo personRepo;

    public OrganizationDtoCrudService(JpaFilterConverter jpaFilterConverter, OrganizationRepo personRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.personRepo = personRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull OrganizationDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<OrganizationDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, OrganizationDao.class)
                : Specification.anyOf();
        Page<OrganizationDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(o -> {
            o.setDepartments(null);
            return o;
        }).map(OrganizationDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable OrganizationDto save(OrganizationDto value) {
        boolean check = value.id() != null && value.id() > 0;
        OrganizationDao person = check
                ? personRepo.getReferenceById(value.id())
                : new OrganizationDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        OrganizationDto.fromDTO(value, person);
        return OrganizationDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }

    public IDashBoardRptDto getDashBoardRpt() {
        return IDashBoardRptDto.fromEntity(personRepo.getDashBoardRpt());
    }
}
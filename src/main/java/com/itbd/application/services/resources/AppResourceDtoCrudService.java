package com.itbd.application.services.resources;

import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.dto.resources.AppResourceDto;
import com.itbd.application.repos.resources.AppResourceRepo;
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
public class AppResourceDtoCrudService implements CrudService<AppResourceDto, String> {

    private final JpaFilterConverter jpaFilterConverter;

    private final AppResourceRepo resourceRepo;

    public AppResourceDtoCrudService(JpaFilterConverter jpaFilterConverter, AppResourceRepo resourceRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.resourceRepo = resourceRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull AppResourceDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<AppResourceDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, AppResourceDao.class)
                : Specification.anyOf();
        Page<AppResourceDao> persons = resourceRepo.findAll(spec, pageable);
        return persons.stream().map(AppResourceDto::fromEntity).toList();
    }

    @Nonnull
    public List<@Nonnull AppResourceDto> allResource() {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        List<AppResourceDao> resources = resourceRepo.findAll();
        return resources.stream().map(AppResourceDto::fromEntity).toList();
    }


    @Override
    @Transactional
    public @Nullable AppResourceDto save(AppResourceDto value) {
        boolean check = value.name() != null && !value.name().isEmpty();
        AppResourceDao person = check
                ? resourceRepo.getReferenceById(value.name())
                : new AppResourceDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        AppResourceDto.fromDTO(value, person);
        return AppResourceDto.fromEntity(resourceRepo.save(person));
    }

    @Override
    public void delete(String name) {
        resourceRepo.deleteById(name);
    }
}
package com.itbd.application.services.resources.permissions;

import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import com.itbd.application.dao.resources.permissions.AppPermissionKey;
import com.itbd.application.dto.resources.permissions.AppPermissionDto;
import com.itbd.application.repos.resources.permissions.AppPermissionRepo;
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
public class AppPermissionDtoCrudService implements CrudService<AppPermissionDto, AppPermissionKey> {

    private final JpaFilterConverter jpaFilterConverter;

    private final AppPermissionRepo permissionRepo;

    public AppPermissionDtoCrudService(JpaFilterConverter jpaFilterConverter, AppPermissionRepo permissionRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.permissionRepo = permissionRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull AppPermissionDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<AppPermissionDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, AppPermissionDao.class)
                : Specification.anyOf();
        Page<AppPermissionDao> persons = permissionRepo.findAll(spec, pageable);
        return persons.stream().map(AppPermissionDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable AppPermissionDto save(AppPermissionDto value) {
        boolean check = value.resourceId() != null && value.roleId() != null && !value.resourceId().isEmpty() && value.roleId() > 0;
        AppPermissionKey key = new AppPermissionKey(value.resourceId(), value.roleId());
//        AppPermissionDao person = permissionRepo.findById(key).orElseGet(AppPermissionDao::new);
        AppPermissionDao person = check ? permissionRepo.getReferenceById(key) : new AppPermissionDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        AppPermissionDto.fromDTO(value, person);
        return AppPermissionDto.fromEntity(permissionRepo.save(person));
    }

    @Override
    public void delete(AppPermissionKey id) {
        permissionRepo.deleteById(id);
    }
}
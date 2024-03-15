package com.itbd.application.services.resources;

import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.dao.resources.RolesDao;
import com.itbd.application.dao.resources.permissions.AppPermissionDao;
import com.itbd.application.dto.resources.RoleDto;
import com.itbd.application.repos.resources.AppResourceRepo;
import com.itbd.application.repos.resources.RolesRepo;
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
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@BrowserCallable
@AnonymousAllowed
public class RolesDtoCrudService implements CrudService<RoleDto, Long> {

    private final JpaFilterConverter jpaFilterConverter;

    private final RolesRepo rolesRepo;
    private final AppResourceRepo resourceRepo;
    private final AppPermissionRepo permissionRepo;

    public RolesDtoCrudService(JpaFilterConverter jpaFilterConverter,
                               AppResourceRepo resourceRepo,
                               AppPermissionRepo permissionRepo,
                               RolesRepo rolesRepo
    ) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.rolesRepo = rolesRepo;
        this.resourceRepo = resourceRepo;
        this.permissionRepo = permissionRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull RoleDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<RolesDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, RolesDao.class)
                : Specification.anyOf();
        Page<RolesDao> roles = rolesRepo.findAll(spec, pageable);
        return roles
                .stream()
                .map(role -> {
                    role.setUsers(null);
                    role.setPermissions(null);
                    return role;
                })
                .map(RoleDto::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public @Nullable RoleDto save(RoleDto value) {
        boolean check = value.id() != null && value.id() > 0;
        RolesDao role = check
                ? rolesRepo.getReferenceById(value.id())
                : new RolesDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        RoleDto.fromDTO(value, role);
        return RoleDto.fromEntity(rolesRepo.save(role));
    }

    @Override
    public void delete(Long id) {
        rolesRepo.deleteById(id);
    }

    public @Nullable RoleDto get(Long id) {
        Optional<RolesDao> roleOptional = rolesRepo.findById(id);
        if (roleOptional.isPresent()) {
            RolesDao role = roleOptional.get();
            role.setUsers(null);
            Set<AppPermissionDao> permissions = permissionRepo.findByRoleId(id).stream().map(p -> {
                AppResourceDao aE = p.getResource();
                aE.setPermissions(null);
                p.setRole(null);
                p.setResource(aE);
                return p;
            }).collect(Collectors.toSet());

            role.setPermissions(permissions);
            return RoleDto.fromEntity(role);
        }
        return null;
    }
}
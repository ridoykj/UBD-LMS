package com.itbd.application.services.resources;

import com.itbd.application.dao.user.UserDao;
import com.itbd.application.dto.user.UserDto;
import com.itbd.application.repos.user.UserRepo;
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
public class UsersDtoCrudService implements CrudService<UserDto, Long> {

    private final JpaFilterConverter jpaFilterConverter;

    private final UserRepo userRepo;

    public UsersDtoCrudService(JpaFilterConverter jpaFilterConverter, UserRepo userRepo) {
        this.jpaFilterConverter = jpaFilterConverter;
        this.userRepo = userRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull UserDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<UserDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, UserDao.class)
                : Specification.anyOf();
        Page<UserDao> persons = userRepo.findAll(spec, pageable);
        return persons.stream().map(UserDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable UserDto save(UserDto value) {
        boolean check = value.id() != null && value.id() > 0;
        UserDao person = check
                ? userRepo.getReferenceById(value.id())
                : new UserDao();

        UserDto.fromDTO(value, person);
        return UserDto.fromEntity(userRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        userRepo.deleteById(id);
    }
}
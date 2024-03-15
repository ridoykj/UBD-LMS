package com.itbd.application.services.user.person;

import com.itbd.application.dao.user.person.ContactDao;
import com.itbd.application.dto.user.person.ContactDto;
import com.itbd.application.repos.user.person.ContactRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.filter.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class ContactDtoCrudService implements CrudService<ContactDto, Long> {
    private final ContactRepo contactRepo;

    public ContactDtoCrudService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull ContactDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Page<ContactDao> products = contactRepo.findAll(pageable);
        return products.stream().map(ContactDto::fromEntity).toList();
    }

    @Override
    public @Nullable ContactDto save(ContactDto value) {
        boolean check = value.id() != null && value.id() > 0;
        ContactDao person = check
                ? contactRepo.getReferenceById(value.id())
                : new ContactDao();
        ContactDto.fromDTO(value, person);

        return ContactDto.fromEntity(contactRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        contactRepo.deleteById(id);
    }
}
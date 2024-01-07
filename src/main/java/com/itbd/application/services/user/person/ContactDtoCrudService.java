package com.itbd.application.services.user.person;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itbd.application.dao.user.person.ContactDAO;
import com.itbd.application.dto.user.person.ContactDTO;
import com.itbd.application.repos.user.ContactRepo;
import com.itbd.application.repos.user.PersonRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.filter.Filter;

@BrowserCallable
@AnonymousAllowed
public class ContactDtoCrudService implements CrudService<ContactDTO, Long> {

    private final PersonRepo personRepo;
    // private final AddressRepo addressRepo;
    private final ContactRepo contactRepo;

    public ContactDtoCrudService(PersonRepo personRepo, ContactRepo contactRepo) {
        this.personRepo = personRepo;
        this.contactRepo = contactRepo;
    }

    @Override
    @Nonnull
    public List<@Nonnull ContactDTO> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Page<ContactDAO> products = contactRepo.findAll(pageable);
        return products.stream().map(ContactDTO::fromEntity).toList();
    }

    @Override
    public @Nullable ContactDTO save(ContactDTO value) {
        boolean check = value.id() != null && value.id() > 0;
        ContactDAO person = check
                ? contactRepo.getReferenceById(value.id())
                : new ContactDAO();
        ContactDTO.fromDTO(value, person);

        person.setRecordComment(check ? "UPDATE" : "NEW");
        return ContactDTO.fromEntity(contactRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        contactRepo.deleteById(id);
    }
}
package com.itbd.application.services.org.edu;

import com.itbd.application.dao.org.edu.BatchDao;
import com.itbd.application.dto.org.edu.BatchDto;
import com.itbd.application.repos.org.edu.BatchRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudService;
import dev.hilla.crud.JpaFilterConverter;
import dev.hilla.crud.filter.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class BatchDtoCrudService implements CrudService<BatchDto, Long> {

    @Autowired
    private JpaFilterConverter jpaFilterConverter;

    @Autowired
    private BatchRepo personRepo;

    // public PersonMargeDtoCrudService(BatchRepo personRepo, AddressRepo
    // addressRepo) {
    // this.personRepo = personRepo;
    // this.addressRepo = addressRepo;
    // }

    @Override
    @Nonnull
    public List<@Nonnull BatchDto> list(Pageable pageable, @Nullable Filter filter) {
        // Basic list implementation that only covers pagination,
        // but not sorting or filtering
        Specification<BatchDao> spec = filter != null
                ? jpaFilterConverter.toSpec(filter, BatchDao.class)
                : Specification.anyOf();
        Page<BatchDao> persons = personRepo.findAll(spec, pageable);
        return persons.stream().map(BatchDto::fromEntity).toList();
    }

    @Override
    @Transactional
    public @Nullable BatchDto save(BatchDto value) {
        boolean check = value.id() != null && value.id() > 0;
        BatchDao person = check
                ? personRepo.getReferenceById(value.id())
                : new BatchDao();

        // person.setRecordComment(check ? "UPDATE" : "NEW");
        BatchDto.fromDTO(value, person);
        return BatchDto.fromEntity(personRepo.save(person));
    }

    @Override
    public void delete(Long id) {
        personRepo.deleteById(id);
    }
}
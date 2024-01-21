package com.itbd.application.config.db;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Long> {
    @Override
    public Optional<Long> getCurrentAuditor() {
        // return Optional.ofNullable("Ridoy");
        // return Optional.of(Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName()));
        return Optional.of(100000L);

    }
    // @Override
    // public String getCurrentAuditor() {
    // return "Naresh";
    // // Can use Spring Security to return currently logged in user
    // // return ((User)
    // SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()
    // }

}
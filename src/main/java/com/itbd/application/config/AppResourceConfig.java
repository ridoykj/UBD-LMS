package com.itbd.application.config;

import com.itbd.application.constants.enums.appresource.AppResourcesEnum;
import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.repos.resources.AppResourceRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppResourceConfig {

    private final AppResourceRepo resourceRepo;

    public AppResourceConfig(AppResourceRepo resourceRepo) {
        this.resourceRepo = resourceRepo;
    }

    @Bean
    public void initAppResourceConfig() {
        for (AppResourcesEnum p : AppResourcesEnum.values()) {
            Optional<AppResourceDao> check = resourceRepo.findById(p.name());
            AppResourceDao resource = check.orElseGet(AppResourceDao::new);
            resource.setResourceId(p.name());
            resource.setName(p.getName());
            resource.setDescription(p.getDescription());
            resourceRepo.save(resource);
        }
    }
}

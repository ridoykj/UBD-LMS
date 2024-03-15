package com.itbd.application.config;

import com.itbd.application.annotations.AppAccess;
import com.itbd.application.annotations.RBACAccess;
import com.itbd.application.constants.enums.appresource.AppResourcesEnum;
import com.itbd.application.dao.resources.AppResourceDao;
import com.itbd.application.repos.resources.AppResourceRepo;
import jakarta.annotation.security.RolesAllowed;
import org.reflections.Reflections;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppResourceConfig {
    private final Reflections reflections;
    private final AppResourceRepo resourceRepo;

    public AppResourceConfig(AppResourceRepo resourceRepo) {
        this.resourceRepo = resourceRepo;
        this.reflections = new Reflections(("com.itbd.application"));
    }

    @Bean
    public void initAppResourceConfig() {
        Set<AppResource> resources = reflections.getTypesAnnotatedWith(RBACAccess.class)
                .stream()
                .map(rb -> Arrays
                        .stream(rb.getMethods()).toList())
                .filter(rb -> rb.stream().anyMatch(a -> a.isAnnotationPresent(AppAccess.class) && a.isAnnotationPresent(RolesAllowed.class)))
                .flatMap(Collection::stream)
                .filter(rbac -> rbac.isAnnotationPresent(AppAccess.class) && rbac.isAnnotationPresent(RolesAllowed.class))
                .map(rbac -> {
                    AppAccess appAccess = rbac.getAnnotation(AppAccess.class);
                    return new AppResource(appAccess.resource().name(), appAccess.action().name());
                }).collect(Collectors.toSet());

        //resources group by resourceId, list actions and return me a list of AppResourceDao objects
        Set<AppResourceDao> appResourceDaos = resources.stream()
                .collect(Collectors.groupingBy(
                        AppResource::resourceId,
                        Collectors.mapping(
                                AppResource::actions,
                                Collectors.toSet()
                        )
                ))
                .entrySet().stream()
                .map(entry -> {
                    AppResourcesEnum rEnum = AppResourcesEnum.valueOf(entry.getKey());
                    AppResourceDao resource = new AppResourceDao();
                    resource.setResourceId(rEnum.name());
                    resource.setName(rEnum.getName());
                    resource.setDescription(rEnum.getDescription());
                    resource.setActions(entry.getValue());
                    return resource;
                })
                .collect(Collectors.toSet());

        appResourceDaos.forEach(p -> {
            AppResourceDao resource = resourceRepo.findById(p.getResourceId()).orElseGet(AppResourceDao::new);
            resource.setResourceId(p.getResourceId());
            resource.setName(p.getName());
            resource.setDescription(p.getDescription());
            resource.setActions(p.getActions());
            resourceRepo.save(resource);
        });
    }

    private record AppResource(String resourceId, String actions) {
    }
}

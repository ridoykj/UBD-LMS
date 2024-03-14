package com.itbd.application.dto.resources;

import com.itbd.application.dao.resources.AppResourceDao;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

import java.util.Set;

public record AppResourceDto(
        @Id String resourceId,
        @Version Long version,
        String name,
        Set<String> actions,
        String description
) {
    public static AppResourceDto fromEntity(AppResourceDao appResource) {
        return new AppResourceDto(
                appResource.getResourceId(),
                appResource.getVersion(),
                appResource.getName(),
                appResource.getActions(),
                appResource.getDescription());
    }

    public static void fromDTO(AppResourceDto appResourceDTO, AppResourceDao appResourceDAO) {
        appResourceDAO.setResourceId(appResourceDTO.resourceId());
        appResourceDAO.setVersion(appResourceDTO.version());
        appResourceDAO.setName(appResourceDTO.name());
        appResourceDAO.setActions(appResourceDTO.actions());
        appResourceDAO.setDescription(appResourceDTO.description());
    }
}

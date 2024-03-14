package com.itbd.application.converts;

import com.itbd.application.constants.enums.appresource.AppPermissionsEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Set;
import java.util.stream.Collectors;


@Converter
public class StringPermissionConverter implements AttributeConverter<Set<AppPermissionsEnum>, String> {

    @Override
    public String convertToDatabaseColumn(Set<AppPermissionsEnum> attribute) {
        // Convert list to JSON string
        return attribute.stream().map(AppPermissionsEnum::name).collect(Collectors.joining(","));
    }

    @Override
    public Set<AppPermissionsEnum> convertToEntityAttribute(String string) {
        // Convert JSON string back to list
        return Set.of(string.split(",")).stream().map(AppPermissionsEnum::valueOf).collect(Collectors.toSet());
    }
}
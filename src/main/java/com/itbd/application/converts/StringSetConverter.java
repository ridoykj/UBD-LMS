package com.itbd.application.converts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Converter
public class StringSetConverter implements AttributeConverter<Set<String>, String> {

    @Override
    public String convertToDatabaseColumn(Set<String> attribute) {
        // Convert list to JSON string
        if (attribute == null) {
            return null;
        }
        return String.join(",", attribute);
    }

    @Override
    public Set<String> convertToEntityAttribute(String string) {
        // Convert JSON string back to list
        if (string == null || string.isEmpty()) {
            return Collections.emptySet();
        }
        return Stream.of(string.split(",")).collect(Collectors.toSet());
    }
}
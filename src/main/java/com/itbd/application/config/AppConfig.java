package com.itbd.application.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;

@Configuration
@PropertySource({"classpath:application.properties", "classpath:application-${spring.profiles.active}.properties"})
public class AppConfig {

    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // factory.setMaxFileSize(DataSize.ofMegabytes(200)); // 2MB
        // factory.setMaxRequestSize(DataSize.ofMegabytes(200)); // 2MB

        factory.setMaxFileSize(DataSize.ofMegabytes(150)); // 2MB
        factory.setMaxRequestSize(DataSize.ofMegabytes(150)); // 2MB
        return factory.createMultipartConfig();
    }
}
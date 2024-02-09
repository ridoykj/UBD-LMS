package com.itbd.application;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * The entry point of the Spring Boot application.
 * <p>
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
// https://github.com/hrshadhin/school-management-system
// https://github.com/ADi7YA26/Student-Dashboard
@SpringBootApplication
@Theme(value = "ubd-lms")
@PWA(name = "UBD-LMS", shortName = "UBD-LMS", iconPath = "favicon/favicon.png")
public class WeApplication implements AppShellConfigurator {
    public static void main(String[] args) {
        SpringApplication.run(WeApplication.class, args);
    }

}

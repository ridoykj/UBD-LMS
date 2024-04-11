package com.itbd.application.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import org.springframework.stereotype.Service;

@BrowserCallable
@AnonymousAllowed
@Service
public class Users {
    public User[] getUsers() {
        User[] users = new User[]{
                new User(1, "Ridoy", "John", " ridoykj@gmail.com", "Software Engineer"),
                new User(2, "John", "Doe", "johndoe@example.com", "Designer"),
                new User(1, "Jane", "Johnson", "bobsmith@example.com", "Product Manager"),
                new User(1, "Jane", "Smith", "janedoe@example.com", "Marketing Manager"),
                new User(1, "Bob", "Doe", "alicejohnson@example.com", "Sales Representative"),
        };
        return users;
    }

    public record User(int id, String firstName, String lastName, String email, String profession) {
        public User {
            if (firstName.isBlank()) {
                throw new IllegalArgumentException("First name cannot be blank");
            }
            if (lastName.isBlank()) {
                throw new IllegalArgumentException("Last name cannot be blank");
            }
            if (email.isBlank()) {
                throw new IllegalArgumentException("Email cannot be blank");
            }
            if (profession.isBlank()) {
                throw new IllegalArgumentException("Profession cannot be blank");
            }
        }
    }
}

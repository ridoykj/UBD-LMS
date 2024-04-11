package com.itbd.application.rdatabase;

import com.itbd.application.dao.user.UserDao;
import com.itbd.application.repos.user.UserRepo;
import com.itbd.application.repos.user.person.PersonRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

@SpringBootTest
public class InsertUserTest {
    // write test case code for insert user into database UserDao and UserDto UserRepo
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PersonRepo personRepo;

    @Test
    public void findAllUser() {
        // create a new user
        personRepo.findAll().forEach(System.out::println);
    }

    @Test
    public void insertUser() {
        // person to user
        List<UserDao> users = personRepo.findAll().stream()
                .map(person -> {
                    UserDao user = new UserDao();
                    user.setPerson(person);
                    user.setUsername(person.getGivenName());
                    user.setPassword("password");
                    user.setPrimaryEmail(UUID.randomUUID() + "@gmail.com");
                    return user;
                }).toList();
        users.forEach(p -> System.out.println(p.toString()));
//        userRepo.saveAll(users);
    }

    @Test
    public void genEmail() {
        System.out.println(UUID.randomUUID() + "@gmail.com");
    }
}

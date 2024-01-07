package com.itbd.application.dto.user;

import com.itbd.application.dao.org.edu.BatchDAO;
import com.itbd.application.dao.user.person.PersonDAO;

public record StudentDTO(
        Long id,
        String name,
        String smsReceiveNo,
        String emailReceive,
        String guardian,
        String guardianPhone,
        String status,
        BatchDAO batch,
        PersonDAO personKey) {
}

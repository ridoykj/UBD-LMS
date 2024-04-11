package com.itbd.application.dto.user.instructor;

import com.itbd.application.dao.user.InstructorDao;
import com.itbd.application.dao.user.UserDao;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;
import org.springframework.data.annotation.Version;

public record InstructorDto(
        @Id Long id,
        @Version Long version,
        String name,
        String email,
        String description,
        String designation,
        String qualification,
        PersonDao person) {

    public static void fromDTO(InstructorDto value, InstructorDao instructor) {
        instructor.setId(value.id());
        instructor.setVersion(value.version());
        instructor.setName(value.name());
        instructor.setEmail(value.email());
        instructor.setDescription(value.description());
        instructor.setDesignation(value.designation());
        instructor.setQualification(value.qualification());
//        instructor.setPerson(value.person());

        PersonDao person = value.person() != null ? value.person() : new PersonDao();
        AddressDao address = person.getAddress() != null ? person.getAddress() : new AddressDao();
        ContactDao contact = person.getContact() != null ? person.getContact() : new ContactDao();
        DocumentRecordsDao documentRecords = person.getRecord() != null ? person.getRecord() : new DocumentRecordsDao();
        MedicalDao medical = person.getMedical() != null ? person.getMedical() : new MedicalDao();
        OccupationDao occupation = person.getOccupation() != null ? person.getOccupation() : new OccupationDao();
        UserDao user = person.getUser() != null ? person.getUser() : new UserDao();

        address.setPerson(person);
        contact.setPerson(person);
        documentRecords.setPerson(person);
        medical.setPerson(person);
        occupation.setPerson(person);
        user.setPerson(person);
        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(documentRecords);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(instructor);
        instructor.setPerson(person);
    }

    public static InstructorDto fromEntity(InstructorDao instructor) {
        PersonDao person = instructor.getPerson();

        AddressDao address = person.getAddress();
        ContactDao contact = person.getContact();
        DocumentRecordsDao records = person.getRecord();
        MedicalDao medical = person.getMedical();
        OccupationDao occupation = person.getOccupation();

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(records);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(null);
        person.setUser(null);

        instructor.setPerson(person);
        instructor.setReservations(null);
        return new InstructorDto(
                instructor.getId(),
                instructor.getVersion(),
                instructor.getName(),
                instructor.getEmail(),
                instructor.getDescription(),
                instructor.getDesignation(),
                instructor.getQualification(),
                instructor.getPerson());
    }
}

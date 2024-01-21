package com.itbd.application.dto.user.instructor;

import com.itbd.application.dao.user.InstructorDAO;
import com.itbd.application.dao.user.person.*;
import jakarta.persistence.Id;
import org.springframework.data.annotation.Version;

public record InstructorDTO(
        @Id Long id,
        @Version Long version,
        String name,
        String email,
        String description,
        String designation,
        String qualification,
        PersonDAO person) {

    public static void fromDTO(InstructorDTO value, InstructorDAO instructor) {
        instructor.setId(value.id());
        instructor.setVersion(value.version());
        instructor.setName(value.name());
        instructor.setEmail(value.email());
        instructor.setDescription(value.description());
        instructor.setDesignation(value.designation());
        instructor.setQualification(value.qualification());
//        instructor.setPerson(value.person());

        PersonDAO person = value.person() != null ? value.person() : new PersonDAO();
        AddressDAO address = person.getAddress() != null ? person.getAddress() : new AddressDAO();
        ContactDAO contact = person.getContact() != null ? person.getContact() : new ContactDAO();
        DocumentRecordsDAO documentRecords = person.getRecord() != null ? person.getRecord() : new DocumentRecordsDAO();
        MedicalDAO medical = person.getMedical() != null ? person.getMedical() : new MedicalDAO();
        OccupationDAO occupation = person.getOccupation() != null ? person.getOccupation() : new OccupationDAO();

        address.setPerson(person);
        contact.setPerson(person);
        documentRecords.setPerson(person);
        medical.setPerson(person);
        occupation.setPerson(person);
        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(documentRecords);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(instructor);
        instructor.setPerson(person);
    }

    public static InstructorDTO fromEntity(InstructorDAO instructor) {
        PersonDAO person = instructor.getPerson();

        AddressDAO address = person.getAddress();
        ContactDAO contact = person.getContact();
        DocumentRecordsDAO records = person.getRecord();
        MedicalDAO medical = person.getMedical();
        OccupationDAO occupation = person.getOccupation();

        person.setAddress(address);
        person.setContact(contact);
        person.setRecord(records);
        person.setMedical(medical);
        person.setOccupation(occupation);
        person.setInstructor(null);

        instructor.setPerson(person);
        instructor.setReservations(null);
        return new InstructorDTO(
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

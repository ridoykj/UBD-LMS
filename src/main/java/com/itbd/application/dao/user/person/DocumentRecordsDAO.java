package com.itbd.application.dao.user.person;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_document_records")
@Getter
@Setter
public class DocumentRecordsDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_document_records_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "longtext")
    private String records;

    @Column(columnDefinition = "longtext")
    private String educationRecords;

    @Column(columnDefinition = "longtext")
    private String nationalRecords;

    @Column(columnDefinition = "longtext")
    private String medicalRecords;

    @Column(columnDefinition = "longtext")
    private String rewardRecords;
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
       @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}

package com.itbd.application.dao.user.person;

import com.itbd.application.dao.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_contact")
@Getter
@Setter
public class ContactDAO extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_contact_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "longtext", name = "tx_email")
    private String email;

    @Column(columnDefinition = "longtext", name = "tx_mobile")
    private String mobile;

    @Column(columnDefinition = "longtext", name = "tx_telephone")
    private String telephone;

    @Column(columnDefinition = "longtext", name = "tx_fax_number")
    private String faxNumber;

    @Column(name = "id_contact_point")
    private Long contactPoint;

    @Column(columnDefinition = "longtext", name = "tx_web_profile")
    private String webProfile;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_person_key", nullable = false)
    @OneToOne
    // @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_person_key")
    private PersonDAO personKey;

}

package com.itbd.application.dao.user.person;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.itbd.application.dao.AbstractEntity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "t_per_contact")
@Getter
@Setter
public class ContactDao extends AbstractEntity<Long> {

    @Id
    @Column(name = "id_contact_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_contact_ver", nullable = false)
    private Long version;

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
    @JsonBackReference
    private PersonDao person;

}

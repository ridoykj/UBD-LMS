package com.itbd.application.dao.org.academic;

import com.itbd.application.dao.AbstractEntity;
import com.itbd.application.dao.org.edu.DepartmentDAO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "t_org_organization")
@Getter
@Setter
public class OrganizationDAO extends AbstractEntity<Long> {
    @Id
    @Column(name = "id_organization_key", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Version
    @Nullable
    @Column(name = "id_organization_ver", nullable = false)
    private Long version;

    @Column(name = "tx_name")
    private String name;

    @Column(name = "tx_description")
    private String description;

    @Column(name = "tx_email")
    private String email;

    @Column(name = "tx_phone")
    private String phone;

    @Column(name = "tx_website")
    private String website;

    @Column(name = "tx_address")
    private String address;

    @Column(name = "tx_city")
    private String city;

    @Column(name = "tx_state")
    private String state;

    @Column(name = "tx_country")
    private String country;

    @Column(name = "tx_zip")
    private String zip;

    @Column(name = "tx_alumni")
    private String alumni;

    @Column(name = "tx_area_served")
    private String areaServed;

    @Column(name = "tx_award")
    private String award;

    @Column(name = "tx_brand")
    private String brand;

    @Column(name = "tx_contact_point")
    private String contactPoint;

    @Column(name = "tx_corrections_policy")
    private String correctionsPolicy;

    @Column(name = "tx_department")
    private String department;

    @Column(name = "tx_duns")
    private String duns;

    @Column(name = "tx_employee")
    private String employee;

    @Column(name = "tx_ethics_policy")
    private String ethicsPolicy;

    @Column(name = "tx_event")
    private String event;

    @Column(name = "tx_fax_number")
    private String faxNumber;

    @Column(name = "tx_founder")
    private String founder;

    @Column(name = "tx_founding_date")
    private LocalDateTime foundingDate;

    @Column(name = "tx_founding_location")
    private String foundingLocation;

    @Column(name = "tx_funder")
    private String funder;

    @Column(name = "tx_funding")
    private String funding;

    @Column(name = "tx_global_location_number")
    private String globalLocationNumber;

    @Column(name = "has_credential")
    private Boolean hasCredential;

    @Column(name = "has_merchant_return_policy")
    private Boolean hasMerchantReturnPolicy;

    @Column(name = "has_offer_catalog")
    private Boolean hasOfferCatalog;

    @Column(name = "has_pos")
    private Boolean hasPOS;

    @Column(name = "has_interaction_statistic")
    private Boolean interactionStatistic;

    @Column(name = "tx_isic_v4")
    private String isicV4;

    @Column(name = "tx_iso6523_code")
    private String iso6523Code;

    @Column(name = "tx_keywords")
    private String keywords;

    // @Column(name = "tx_knows_about")
    // private String knowsAbout;

    // @Column(name = "tx_knows_language")
    // private String knowsLanguage;

    @Column(name = "tx_legal_name")
    private String legalName;

    @Column(name = "tx_location")
    private String location;

    @Column(name = "ct_member")
    private Long members;

    @Column(name = "tx_member_of")
    private String memberOf;

    @Column(name = "tx_naics")
    private String naics;

    @Column(name = "has_nonprofit_status")
    private Boolean nonprofitStatus;

    @Column(name = "ct_employees")
    private Long numberOfEmployees;

    // @Column(name = "tx_ownership_funding_info")
    // private String ownershipFundingInfo;

    @Column(name = "tx_owns")
    private String owns;

    @Column(name = "tx_parent_organization")
    private String parentOrganization;

    // @Column(name = "tx_publishing_principles")
    // private String publishingPrinciples;

    @Column(name = "tx_review")
    private String review;

    @Column(name = "tx_seeks")
    private String seeks;

    @Column(name = "tx_slogan")
    private String slogan;

    // @Column(name = "tx_sponsor")
    // private String sponsor;

    // @Column(name = "tx_sub_organization")
    // private String subOrganization;

    @Column(name = "tx_tax_id")
    private String taxId;

    @Column(name = "tx_telephone")
    private String telephone;

    @Column(name = "tx_vat_id")
    private String vatId;

    // @Column(name = "tx_additional_type")
    // private String additionalType;

    @Column(name = "tx_alternate_name")
    private String alternateName;

    @Column(name = "tx_identifier")
    private String identifier;

    @Column(name = "tx_image")
    private String image;

    // @Column(name = "tx_potential_action")
    // private String potentialAction;

    // @Column(name = "tx_same_as")
    // private String sameAs;

    // @Column(name = "tx_subject_of")
    // private String subjectOf;

    // @Column(name = "tx_acquired_from")
    // private String acquiredFrom;

    @Column(name = "tx_affiliation")
    private String affiliation;

    // @Column(name = "tx_agent")
    // private String agent;

    @Column(name = "tx_alumni_of")
    private String alumniOf;

    @Column(name = "tx_attendee")
    private String attendee;

    @Column(name = "ct_attendees")
    private Long attendees;

    // @Column(name = "tx_authenticator")
    // private String authenticator;

    @Column(name = "tx_author")
    private String author;

    // @Column(name = "tx_bcc_recipient")
    // private String bccRecipient;

    @Column(name = "tx_branch_of")
    private String branchOf;

    // @Column(name = "tx_broadcast_affiliate_of")
    // private String broadcastAffiliateOf;

    // @Column(name = "tx_broadcaster")
    // private String broadcaster;

    // @Column(name = "tx_broker")
    // private String broker;

    // @Column(name = "tx_buyer")
    // private String buyer;

    @Column(name = "tx_carrier")
    private String carrier;

    // @Column(name = "tx_cc_recipient")
    // private String ccRecipient;

    // @Column(name = "tx_claim_interpreter")
    // private String claimInterpreter;

    // @Column(name = "tx_composer")
    // private String composer;

    // @Column(name = "tx_contributor")
    // private String contributor;

    @Column(name = "tx_copyright_holder")
    private String copyrightHolder;

    @Column(name = "tx_creator")
    private String creator;

    // @Column(name = "tx_credited_to")
    // private String creditedTo;

    // @Column(name = "ct_customer")
    // private BigDecimal customer;

    @Column(name = "has_hiring_organization")
    private Boolean hiringOrganization;

    @Column(name = "has_hosting_organization")
    private Boolean hostingOrganization;

    @Column(name = "tx_issued_by")
    private String issuedBy;

    @Column(name = "tx_landlord")
    private String landlord;

    // @Column(name = "tx_lender")
    // private String lender;

    // @Column(name = "tx_maintainer")
    // private String maintainer;

    // @Column(name = "tx_manufacturer")
    // private String manufacturer;

    // @Column(name = "tx_merchant")
    // private String merchant;

    // @Column(name = "tx_offered_by")
    // private String offeredBy;

    // @Column(name = "tx_organizer")
    // private String organizer;

    // @Column(name = "tx_participant")
    // private String participant;

    // @Column(name = "tx_performer")
    // private String performer;

    // @Column(name = "tx_performers")
    // private String performers;

    // @Column(name = "tx_producer")
    // private String producer;

    // @Column(name = "tx_production_company")
    // private String productionCompany;

    // @Column(name = "tx_provider")
    // private String provider;

    // @Column(name = "tx_published_by")
    // private String publishedBy;

    // @Column(name = "tx_publisher")
    // private String publisher;

    // @Column(name = "tx_publisher_imprint")
    // private String publisherImprint;

    // @Column(name = "tx_recipient")
    // private String recipient;

    // @Column(name = "tx_recognized_by")
    // private String recognizedBy;

    // @Column(name = "tx_recognizing_authority")
    // private String recognizingAuthority;

    // @Column(name = "tx_record_label")
    // private String recordLabel;

    // @Column(name = "tx_reviewed_by")
    // private String reviewedBy;

    // @Column(name = "tx_sd_publisher")
    // private String sdPublisher;

    // @Column(name = "tx_seller")
    // private String seller;

    // @Column(name = "tx_sender")
    // private String sender;

    // @Column(name = "tx_service_operator")
    // private String serviceOperator;

    // @Column(name = "tx_source_organization")
    // private String sourceOrganization;

    @OneToMany(mappedBy = "organization")
    private List<DepartmentDAO> departments;

}
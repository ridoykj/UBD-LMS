package com.itbd.application.dto.org.academic;

import java.time.LocalDateTime;
import java.util.List;

import com.itbd.application.dao.org.academic.OrganizationDAO;
import com.itbd.application.dao.org.edu.DepartmentDAO;

public record OrganizationDTO(
                Long id,
                String name,
                String description,
                String email,
                String phone,
                String website,
                String address,
                String city,
                String state,
                String country,
                String zip,
                String brand,
                String faxNumber,
                String founder,
                LocalDateTime foundingDate,
                String foundingLocation,
                String funder,
                String funding,
                Boolean interactionStatistic,
                String keywords,
                String legalName,
                Long members,
                String owns,
                String parentOrganization,
                String review,
                String seeks,
                String slogan,
                String taxID,
                String telephone,
                String vatID,
                String alternateName,
                String identifier,
                String image,
                String affiliation,
                String creator,
                List<DepartmentDAO> departments) {
        public static OrganizationDTO fromEntity(OrganizationDAO organization) {
                return new OrganizationDTO(
                                organization.getId(),
                                organization.getName(),
                                organization.getDescription(),
                                organization.getEmail(),
                                organization.getPhone(),
                                organization.getWebsite(),
                                organization.getAddress(),
                                organization.getCity(),
                                organization.getState(),
                                organization.getCountry(),
                                organization.getZip(),
                                organization.getBrand(),
                                organization.getFaxNumber(),
                                organization.getFounder(),
                                organization.getFoundingDate(),
                                organization.getFoundingLocation(),
                                organization.getFunder(),
                                organization.getFunding(),
                                organization.getInteractionStatistic(),
                                organization.getKeywords(),
                                organization.getLegalName(),
                                organization.getMembers(),
                                organization.getOwns(),
                                organization.getParentOrganization(),
                                organization.getReview(),
                                organization.getSeeks(),
                                organization.getSlogan(),
                                organization.getTaxID(),
                                organization.getTelephone(),
                                organization.getVatID(),
                                organization.getAlternateName(),
                                organization.getIdentifier(),
                                organization.getImage(),
                                organization.getAffiliation(),
                                organization.getCreator(),
                                organization.getDepartments());
        }

        public static void fromDTO(OrganizationDTO organizationDTO, OrganizationDAO organizationDAO) {
                organizationDAO.setId(organizationDTO.id());
                organizationDAO.setName(organizationDTO.name());
                organizationDAO.setDescription(organizationDTO.description());
                organizationDAO.setEmail(organizationDTO.email());
                organizationDAO.setPhone(organizationDTO.phone());
                organizationDAO.setWebsite(organizationDTO.website());
                organizationDAO.setAddress(organizationDTO.address());
                organizationDAO.setCity(organizationDTO.city());
                organizationDAO.setState(organizationDTO.state());
                organizationDAO.setCountry(organizationDTO.country());
                organizationDAO.setZip(organizationDTO.zip());
                organizationDAO.setBrand(organizationDTO.brand());
                organizationDAO.setFaxNumber(organizationDTO.faxNumber());
                organizationDAO.setFounder(organizationDTO.founder());
                organizationDAO.setFoundingDate(organizationDTO.foundingDate());
                organizationDAO.setFoundingLocation(organizationDTO.foundingLocation());
                organizationDAO.setFunder(organizationDTO.funder());
                organizationDAO.setFunding(organizationDTO.funding());
                organizationDAO.setInteractionStatistic(organizationDTO.interactionStatistic());
                organizationDAO.setKeywords(organizationDTO.keywords());
                organizationDAO.setLegalName(organizationDTO.legalName());
                organizationDAO.setMembers(organizationDTO.members());
                organizationDAO.setOwns(organizationDTO.owns());
                organizationDAO.setParentOrganization(organizationDTO.parentOrganization());
                organizationDAO.setReview(organizationDTO.review());
                organizationDAO.setSeeks(organizationDTO.seeks());
                organizationDAO.setSlogan(organizationDTO.slogan());
                organizationDAO.setTaxID(organizationDTO.taxID());
                organizationDAO.setTelephone(organizationDTO.telephone());
                organizationDAO.setVatID(organizationDTO.vatID());
                organizationDAO.setAlternateName(organizationDTO.alternateName());
                organizationDAO.setIdentifier(organizationDTO.identifier());
                organizationDAO.setImage(organizationDTO.image());
                organizationDAO.setAffiliation(organizationDTO.affiliation());
                organizationDAO.setCreator(organizationDTO.creator());
                organizationDAO.setDepartments(organizationDTO.departments());
        }
}

package com.itbd.application.dto.custom;

import com.itbd.application.dao.custom.IDashBoardRptDAO;
import com.itbd.application.dto.org.academic.OrganizationDTO;

public record IDashBoardRptDTO(
        Long sectors,
        Long buildings,
        Long floors,
        Long rooms,
        Long profiles,
        Long departments,
        Long programmes,
        Long batches,
        Long courses,
        Long coordinators
) {
    public static IDashBoardRptDTO fromEntity(IDashBoardRptDAO dashBoardRptDAO) {
        return new IDashBoardRptDTO(
                dashBoardRptDAO.getSectors(),
                dashBoardRptDAO.getBuildings(),
                dashBoardRptDAO.getFloors(),
                dashBoardRptDAO.getRooms(),
                dashBoardRptDAO.getProfiles(),
                dashBoardRptDAO.getDepartments(),
                dashBoardRptDAO.getProgrammes(),
                dashBoardRptDAO.getBatches(),
                dashBoardRptDAO.getCourses(),
                dashBoardRptDAO.getCoordinators()
        );
    }
}

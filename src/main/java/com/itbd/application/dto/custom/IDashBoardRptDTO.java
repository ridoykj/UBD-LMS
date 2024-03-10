package com.itbd.application.dto.custom;

import com.itbd.application.dao.custom.IDashBoardRptDao;

public record IDashBoardRptDto(
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
    public static IDashBoardRptDto fromEntity(IDashBoardRptDao dashBoardRptDAO) {
        return new IDashBoardRptDto(
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

package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.custom.IDashBoardRptDAO;
import com.itbd.application.dao.org.academic.OrganizationDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface OrganizationRepo extends JpaRepository<OrganizationDAO, Long>, JpaSpecificationExecutor<OrganizationDAO> {

    @Query(value = """
            select * from (
            (select COUNT(*) as sectors from t_place_sector) as sectors,
            (select COUNT(*)  as buildings from t_place_building) as buildings,
            (select COUNT(*)  as floors from t_place_floor) as floors,
            (select COUNT(*)  as rooms from t_place_room) as rooms,
            (select COUNT(*)  as profiles from t_org_organization ) as profiles,
            (select COUNT(*)  as departments from t_edu_department ted  ) as departments,
            (select COUNT(*)  as programmes from t_edu_programme ) as programmes,
            (select COUNT(*)  as batches from t_edu_batch ) as batches,
            (select COUNT(*)  as courses from t_edu_course  ) as courses,
            (select COUNT(*)  as coordinators from t_org_instructor) as coordinators
            )""", nativeQuery = true)
    IDashBoardRptDAO getDashBoardRpt();
}

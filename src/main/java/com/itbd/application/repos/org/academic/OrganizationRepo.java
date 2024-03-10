package com.itbd.application.repos.org.academic;

import com.itbd.application.dao.custom.IDashBoardRptDao;
import com.itbd.application.dao.org.academic.OrganizationDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface OrganizationRepo extends JpaRepository<OrganizationDao, Long>, JpaSpecificationExecutor<OrganizationDao> {

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
    IDashBoardRptDao getDashBoardRpt();
}

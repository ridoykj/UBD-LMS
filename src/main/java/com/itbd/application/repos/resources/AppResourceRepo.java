package com.itbd.application.repos.resources;

import com.itbd.application.dao.resources.AppResourceDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AppResourceRepo extends JpaRepository<AppResourceDao, String>, JpaSpecificationExecutor<AppResourceDao> {
}
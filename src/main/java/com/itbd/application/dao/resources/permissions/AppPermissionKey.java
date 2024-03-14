package com.itbd.application.dao.resources.permissions;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.Objects;

//@Embeddable
public class AppPermissionKey implements Serializable {

    @Column(name = "tx_resource_key")
    private String resourceId;

    @Column(name = "id_roles_key")
    private Long roleId;

    public AppPermissionKey(String resourceName, Long roleId) {
        this.resourceId = resourceName;
        this.roleId = roleId;
    }
    public AppPermissionKey() {
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppPermissionKey that = (AppPermissionKey) o;
        return Objects.equals(resourceId, that.resourceId) && Objects.equals(roleId, that.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(resourceId, roleId);
    }
}

package com.itbd.application.constants.enums.appresource;

public enum AppPermissionsEnum {
    CREATE("CREATE", "Create", "Create"),
    READ("READ", "Read", "Read"),
    UPDATE("UPDATE", "Update", "Update"),
    DELETE("DELETE", "Delete", "Delete"),
    PRINT("PRINT", "Print", "Print"),
    DOWNLOAD("DOWNLOAD", "Download", "Download"),
    ASSIGN("ASSIGN", "Assign", "Assign");
    private final String access;
    private final String name;
    private final String description;

    AppPermissionsEnum(String access, String name, String description) {
        this.access = access;
        this.name = name;
        this.description = description;
    }

    public String getAccess() {
        return access;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}

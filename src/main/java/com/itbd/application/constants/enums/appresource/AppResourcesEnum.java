package com.itbd.application.constants.enums.appresource;

public enum AppResourcesEnum {
    USER_EMAIL("ROLE_USER_EMAIL", "User Email", "User Email"),
    USER_SMS("ROLE_USER_SMS", "User SMS", "User SMS"),
    USER_NOTIFICATION("ROLE_USER_NOTIFICATION", "User Notification", "User Notification"),
    USER_PROFILE("ROLE_USER_PROFILE", "User Profile", "User Profile"),
    USER_PASSWORD("ROLE_USER_PASSWORD", "User Password", "User Password"),
    USER_ROLE("ROLE_USER_ROLE", "User Role", "User Role"),
    USER_PERMISSION("ROLE_USER_PERMISSION", "User Permission", "User Permission");


    private final String access;
    private final String name;
    private final String description;

    AppResourcesEnum(String access, String name, String description) {
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

    public static AppResourcesEnum fromAccess(String access) {
        for (AppResourcesEnum appResourcesEnum : AppResourcesEnum.values()) {
            if (appResourcesEnum.getAccess().equals(access)) {
                return appResourcesEnum;
            }
        }
        return null;
    }

    public static AppResourcesEnum fromName(String name) {
        for (AppResourcesEnum appResourcesEnum : AppResourcesEnum.values()) {
            if (appResourcesEnum.getName().equals(name)) {
                return appResourcesEnum;
            }
        }
        return null;
    }

    public static AppResourcesEnum fromDescription(String description) {
        for (AppResourcesEnum appResourcesEnum : AppResourcesEnum.values()) {
            if (appResourcesEnum.getDescription().equals(description)) {
                return appResourcesEnum;
            }
        }
        return null;
    }

    public static AppResourcesEnum fromAccessOrNameOrDescription(String value) {
        AppResourcesEnum appResourcesEnum = fromAccess(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromName(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        return fromDescription(value);
    }

    public static AppResourcesEnum fromAccessOrNameOrDescription(String value, AppResourcesEnum defaultValue) {
        AppResourcesEnum appResourcesEnum = fromAccess(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromName(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromDescription(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        return defaultValue;
    }

    public static AppResourcesEnum fromAccessOrNameOrDescription(String value, AppResourcesEnum defaultValue, boolean ignoreCase) {
        if (ignoreCase) {
            value = value.toLowerCase();
        }
        AppResourcesEnum appResourcesEnum = fromAccess(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromName(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromDescription(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        return defaultValue;
    }

    public static AppResourcesEnum fromAccessOrNameOrDescription(String value, boolean ignoreCase) {
        if (ignoreCase) {
            value = value.toLowerCase();
        }
        AppResourcesEnum appResourcesEnum = fromAccess(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromName(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        return fromDescription(value);
    }

    public static AppResourcesEnum fromAccessOrNameOrDescription(String value, boolean ignoreCase, AppResourcesEnum defaultValue) {
        if (ignoreCase) {
            value = value.toLowerCase();
        }
        AppResourcesEnum appResourcesEnum = fromAccess(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromName(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        appResourcesEnum = fromDescription(value);
        if (appResourcesEnum != null) {
            return appResourcesEnum;
        }
        return defaultValue;
    }
}

package com.itbd.application.constants.enums.appresource;

public enum AppResourcesEnum {
    USER_EMAIL("User Email", "User Email"),
    USER_SMS("User SMS", "User SMS"),
    USER_NOTIFICATION("User Notification", "User Notification"),
    USER_PROFILE("User Profile", "User Profile"),
    USER_PASSWORD("User Password", "User Password"),
    USER_ROLE("User Role", "User Role"),
    USER_STREAM_DOWNLOAD("Download Content", "Download Stream Content"),
    USER_PERMISSION("User Permission", "User Permission");

    private final String name;
    private final String description;

    AppResourcesEnum(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}

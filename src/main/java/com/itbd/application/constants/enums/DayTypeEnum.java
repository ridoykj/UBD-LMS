package com.itbd.application.constants.enums;

public enum DayTypeEnum {
    FRIDAY("Friday"), SATURDAY("Saturday"), SUNDAY("Sunday"), MONDAY("Monday"), TUESDAY("Tuesday"), WEDNESDAY("Wednesday"), THURSDAY("Thursday");

    private final String value;

    DayTypeEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static DayTypeEnum fromValue(String value) {
        for (DayTypeEnum dayTypeEnum : DayTypeEnum.values()) {
            if (dayTypeEnum.getValue().equalsIgnoreCase(value)) {
                return dayTypeEnum;
            }
        }
        return null;
    }

    public static DayTypeEnum fromValueIgnoreCase(String value) {
        for (DayTypeEnum dayTypeEnum : DayTypeEnum.values()) {
            if (dayTypeEnum.getValue().equalsIgnoreCase(value)) {
                return dayTypeEnum;
            }
        }
        return null;
    }

    public static DayTypeEnum fromValueIgnoreCaseAndTrim(String value) {
        for (DayTypeEnum dayTypeEnum : DayTypeEnum.values()) {
            if (dayTypeEnum.getValue().equalsIgnoreCase(value.trim())) {
                return dayTypeEnum;
            }
        }
        return null;
    }
}
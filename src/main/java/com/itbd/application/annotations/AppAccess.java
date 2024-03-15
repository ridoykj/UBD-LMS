package com.itbd.application.annotations;

import com.itbd.application.constants.enums.appresource.AppPermissionsEnum;
import com.itbd.application.constants.enums.appresource.AppResourcesEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
public @interface AppAccess {
    AppResourcesEnum resource();
    AppPermissionsEnum action();
    String name();
    String description() default "";
}

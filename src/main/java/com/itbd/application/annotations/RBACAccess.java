package com.itbd.application.annotations;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
public @interface AppAccess {
    String resource();
    String action();
    String name();
    String description() default "";
}

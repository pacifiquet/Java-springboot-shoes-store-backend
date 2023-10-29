package com.store.user.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static com.store.user.utils.Constants.INVALID_EMAIL;
import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CustomerEmailValidation.class)
@Documented
public @interface ValidEmail {
    String message() default INVALID_EMAIL;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
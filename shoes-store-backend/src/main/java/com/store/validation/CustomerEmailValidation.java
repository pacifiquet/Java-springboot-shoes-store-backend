package com.store.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class CustomerEmailValidation implements ConstraintValidator<ValidEmail,String> {
    private static final String EMAIL_PATTERN = "^(?i)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    @Override
    public void initialize(ValidEmail constraintAnnotation) {
        // initialize validation
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return (validEmail(email));
    }

    private boolean validEmail(String email) {
        return Pattern.compile(EMAIL_PATTERN).matcher(email).matches();
    }
}

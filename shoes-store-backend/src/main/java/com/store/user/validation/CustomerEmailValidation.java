package com.store.user.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

import static com.store.utils.Constants.EMAIL_REGEX;

public class CustomerEmailValidation implements ConstraintValidator<ValidEmail, String> {

    @Override
    public void initialize(ValidEmail constraintAnnotation) {
        // initialize validation
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return (validEmail(email));
    }

    private boolean validEmail(String email) {
        return Pattern.compile(EMAIL_REGEX).matcher(email).matches();
    }
}

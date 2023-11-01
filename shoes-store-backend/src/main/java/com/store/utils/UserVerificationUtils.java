package com.store.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.Calendar;
import java.util.Date;

import static com.store.utils.Constants.EXPIRATION_TIME;
import static com.store.utils.Constants.HOST_PREFIX;
import static com.store.utils.Constants.PASSWORD_RESET_URL_PART;
import static com.store.utils.Constants.VERIFICATION_URL_PART;

@Slf4j
public class UserVerificationUtils {
    private UserVerificationUtils() {
        // user verification class
    }

    public static String getVerificationUrl(String token, HttpServletRequest servletRequest) {
        return HOST_PREFIX + servletRequest.getLocalPort() + VERIFICATION_URL_PART + token;
    }

    public static String getRestPasswordUrl(String token, HttpServletRequest servletRequest) {
        return HOST_PREFIX + servletRequest.getLocalPort() + PASSWORD_RESET_URL_PART + token;
    }


    public static Date calculateTokenExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION_TIME);
        return new Date(calendar.getTime().getTime());
    }

}

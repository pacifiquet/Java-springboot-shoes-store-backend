package com.store.user.utils;

public class Constants {
    public Constants() {}

    // email handle
    public final static String MAIL_GRID_ENDPOINT = "mail/send";
    public static final String EMAIL_VERIFY_SUBJECT = "verify your account";
    public static final String RESET_PASSWORD_SUBJECT = "reset password";
    public final static String TEMPLATE_FILE_VERIFY_ACCOUNT = "/email/account-verify-template";
    public final static String TEMPLATE_FILE_RESET_PASSWORD = "/email/reset-password";
    public final static String FILE_TYPE = "text/html";
    public final static String RECIPIENT_NAME = "recipientName";
    public final static String VERIFICATION_LINK = "verificationLink";
    public final static String EMAIL_ERROR_MESSAGE_PREFIX = "failed to send mail to user {}:";
    public final static String EMAIL_LOG_TEST_ENV = "Test env: Click the link to verify your account: {}";
    public final static String EMAIL_LOG_TO_RESET_PASSWORD_TEST_ENV = "Test env: Click the link to reset your password: {}";

    // verification util handle
    public static final String VERIFICATION_URL_PART = "/account/verifyRegistration?token=";
    public static final String PASSWORD_RESET_URL_PART = "/api/v1/users/account/password/save?token=";
    public static final String HOST_PREFIX ="http://localhost:";
    public static final int EXPIRATION_TIME = 10;

    // services handle
    public static final String USER_NOT_FOUND = "user not found";
    public static final String SUCCESS = "success";
    public static final String ERROR = "error";
    public static final String TOKEN = "token";
    public static final String INVALID_TOKEN = "invalid token";
    public static final String EXPIRED_TOKEN = "expired token";
    public static final String ALREADY_VERIFIED_MESSAGE = "account is already verified";
    public static final String SUCCESS_VERIFIED_MESSAGE = "successfully verified";

    // security handle
    public static final String ROLE_PREFIX = "ROLE_";
    public static final String AUTH_TOKEN_TYPE = "Bearer";
    public static final String AUTH_TOKEN_PREFIX = AUTH_TOKEN_TYPE + " ";
    public static final String EMAIL_REGEX = "^(?i)[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    public static final String INVALID_OLD_PASSWORD = "invalid old password";
    public static final String INVALID_EMAIL = "Invalid email";
    public static final String SUCCESS_CHANGED_PASSWORD = "successfully changed password";
    public static final String SAME_AS_OLD_PASSWORD = "same as old password";
    public static final String[] WHITE_LIST_PATH = {
            "/api/v1/auth/**",
            "/api/v1/users/account/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/api/v1/users/account/password/forgot",
            "/api/v1/users/account/password/save",
            "/"
    };

    // cors handle

    public static final String CORS_MAPPING = "/api/v1/**";
    public static final String CORS_ALLOWED_METHOD = "*";
    public static final String CORS_ALLOWED_HEADER = "*";

    // property files
    public static  final String EMAIL_CONFIG_SENDER_GRID = "email-config.sender-grid";
    public static  final String HAVING_VALUE_FALSE = "false";
    public static  final String HAVING_VALUE_TRUE = "true";

}

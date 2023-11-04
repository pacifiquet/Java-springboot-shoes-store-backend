package com.store.utils;

public class Constants {
    // email handle
    public final static String MAIL_GRID_ENDPOINT = "mail/send";
    public final static String EMAIL_SEND_STATUS_CODE = "Email send request has status code: {}";
    public static final String EMAIL_VERIFY_SUBJECT = "verify your account";
    public static final String EMAIL_PURPOSE = "purpose";
    public static final String EMAIL_REGISTER_ACCOUNT = "register";
    public static final String EMAIL_RESET_PASSWORD = "reset";
    public static final String RESET_PASSWORD_SUBJECT = "reset password";
    public final static String TEMPLATE_FILE_VERIFY_ACCOUNT = "/email/account-verify-template";
    public final static String FILE_TYPE = "text/html";
    public final static String RECIPIENT_NAME = "recipientName";
    public final static String EMAIL_LINK_ACTION = "link";
    public final static String EMAIL_ERROR_MESSAGE_PREFIX = "failed to send mail to user {}:";
    public final static String EMAIL_LOG_TEST_ENV = "Test env: Click the link to verify your account: {}";
    public final static String EMAIL_LOG_TO_RESET_PASSWORD_TEST_ENV = "Test env: Click the link to reset your password: {}";
    //    RabbitMQConfig
    public static final String USER_EVENT_QUEUE = "user_event_queue";
    public static final String USER_EVENT_EXCHANGE = "user_event_exchange";
    public static final String USER_EVENT_ROUTING_KEY = "user_event_routing_key";
    // verification util handle
    public static final String VERIFICATION_URL_PART = "/api/v1/users/account/verifyRegistration?token=";
    public static final String VERIFICATION_URL_PART_FRONT_END = "account/verify?token=";
    public static final String PASSWORD_RESET_URL_PART = "/api/v1/users/account/password/save?token=";
    public static final String PASSWORD_RESET_URL_PART_FRONT_END = "account/password/reset?token=";
    public static final String HOST_PREFIX = "http://localhost:";
    public static final String HOST_PREFIX_FRONT_END = "http://localhost:4200/";
    public static final int EXPIRATION_TIME = 10;
    // services handle
    public static final String USER_NOT_FOUND = "user not found";
    public static final String CONVERTING_FILE_ERROR = "Error converting multipartFile to file";
    public static final String FAILED_TO_FETCH_SECRET_ERROR = "failed to get the keys from aws: {}";
    public static final String LAST_NAME = "lastName";
    public static final String OTHER_USER_INFO  = "otherUserInfo";
    public static final String FAILED_TO_UPDATE_USER  = "updating user failed: {}";
    public static final String FIRST_NAME = "firstName";
    public static final String ADDRESS = "address";
    public static final String SUCCESSFULLY_UPDATED = "successfully updated";
    public static final String SUCCESSFULLY_DELETED = "successfully delete";
    public static final String ACCESS_DENIED = "ACCESS DENIED";
    public static final String ACCOUNT_EXIST = "This account exists";
    public static final String SUCCESS = "success";
    public static final String VERIFIED = "verified";
    public static final String ERROR = "error";
    public static final String TOKEN = "token";
    public static final String INVALID_TOKEN = "invalid token";
    public static final String EXPIRED_TOKEN = "expired token";
    public static final String ALREADY_VERIFIED_MESSAGE = "account is already verified";
    public static final String SUCCESS_VERIFIED_MESSAGE = "successfully verified";
    public static final String RESET_PASSWORD_MESSAGE = "check your email to finish resetting your password";
    public static final String VERIFY_ACCOUNT_MESSAGE = "check your email to verify your account";
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
    public static final String CORS_MAPPING = "/api/v1/**";

    // cors handle
    public static final String CORS_ALLOWED_METHOD = "*";
    public static final String CORS_ALLOWED_HEADER = "*";
    // property files
    public static final String EMAIL_CONFIG_SENDER_GRID = "email-config.sender-grid";
    public static final String HAVING_VALUE_FALSE = "false";
    public static final String HAVING_VALUE_TRUE = "true";
    public Constants() {
    }

}

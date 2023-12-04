package com.store.utils;

import com.store.email.EmailContent;
import com.store.user.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import static com.store.utils.Constants.EMAIL_REGISTER_ACCOUNT;
import static com.store.utils.Constants.EMAIL_RESET_PASSWORD;
import static com.store.utils.Constants.EMAIL_VERIFY_SUBJECT;
import static com.store.utils.Constants.RESET_PASSWORD_SUBJECT;
import static com.store.utils.Constants.USER_EVENT_EXCHANGE;
import static com.store.utils.Constants.USER_EVENT_ROUTING_KEY;

public class RabbitMQUtils {
    private RabbitMQUtils() {
        // this utils class no public contractor needed
    }

    public static void sendUserRegisterVerifyEventContentToRabbitMQ(User user, String token, HttpServletRequest httpServletRequest, RabbitTemplate rabbitTemplate) {
        EmailContent emailContent = EmailContent.builder()
                .subject(EMAIL_VERIFY_SUBJECT)
                .recipientName(user.getFirstName())
                .toEmail(user.getEmail())
                .url(UserVerificationUtils.getVerificationUrl(token, httpServletRequest))
                .emailPurpose(EMAIL_REGISTER_ACCOUNT)
                .build();
        rabbitTemplate.convertAndSend(USER_EVENT_EXCHANGE, USER_EVENT_ROUTING_KEY, emailContent);
    }

    public static void sendUserRestPasswordEventContentToRabbitMQ(User user, String token, HttpServletRequest servletRequest, RabbitTemplate rabbitTemplate) {
        EmailContent emailContent = EmailContent.builder()
                .toEmail(user.getEmail())
                .url(UserVerificationUtils.getRestPasswordUrl(token, servletRequest))
                .recipientName(user.getFirstName())
                .subject(RESET_PASSWORD_SUBJECT)
                .emailPurpose(EMAIL_RESET_PASSWORD)
                .build();
        rabbitTemplate.convertAndSend(USER_EVENT_EXCHANGE, USER_EVENT_ROUTING_KEY, emailContent);
    }

}

package com.store.events.listener;

import com.store.email.EmailContent;
import com.store.email.service.IEmailService;
import com.store.events.RegistrationCompleteEvent;
import com.store.user.models.User;
import com.store.user.service.IVerificationTokenService;
import com.store.user.utils.UserVerificationUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

import static com.store.user.utils.Constants.EMAIL_VERIFY_SUBJECT;

@Component
@Slf4j
public record RegistrationCompleteEventListener(IVerificationTokenService verificationTokenService, IEmailService emailService) implements ApplicationListener<RegistrationCompleteEvent> {
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        verificationTokenService.saveVerificationToken(token,user);
        // Send Email to user
        String verificationUrl = UserVerificationUtils.getVerificationUrl(token, event.getServletRequest());
        emailService.sendEmailVerifyRegistrationUser(EmailContent.builder()
                        .subject(EMAIL_VERIFY_SUBJECT)
                        .recipientName(user.getFirstName())
                        .toEmail(user.getEmail())
                        .url(verificationUrl)
                .build());

    }
}

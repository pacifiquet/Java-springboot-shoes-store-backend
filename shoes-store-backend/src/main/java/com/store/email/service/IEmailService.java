package com.store.email.service;

import com.store.email.EmailContent;
import org.springframework.stereotype.Component;

@Component
public interface IEmailService {
    void sendEmailVerifyRegistrationUser(EmailContent emailContent);
     void sendEmailForResetPassword(EmailContent emailContent);
}

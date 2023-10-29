package com.store.email.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.store.config.AwsService;
import com.store.email.EmailConfigProperties;
import com.store.email.EmailContent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Objects;

import static com.store.user.utils.Constants.EMAIL_CONFIG_SENDER_GRID;
import static com.store.user.utils.Constants.EMAIL_ERROR_MESSAGE_PREFIX;
import static com.store.user.utils.Constants.FILE_TYPE;
import static com.store.user.utils.Constants.HAVING_VALUE_TRUE;
import static com.store.user.utils.Constants.MAIL_GRID_ENDPOINT;
import static com.store.user.utils.Constants.RECIPIENT_NAME;
import static com.store.user.utils.Constants.TEMPLATE_FILE_RESET_PASSWORD;
import static com.store.user.utils.Constants.TEMPLATE_FILE_VERIFY_ACCOUNT;
import static com.store.user.utils.Constants.VERIFICATION_LINK;

@Slf4j
@ConditionalOnProperty(name = EMAIL_CONFIG_SENDER_GRID, havingValue = HAVING_VALUE_TRUE, matchIfMissing = true)
@Service
public record EmailService(AwsService awsService,
                           EmailConfigProperties configProperties,
                           TemplateEngine templateEngine
) implements IEmailService {
    @Override
    public void sendEmailVerifyRegistrationUser(EmailContent emailContent) {
        Email from = new Email(configProperties().emailSender());
        Email toEmail = new Email(emailContent.toEmail());
        SendGrid sendGrid = new SendGrid(Objects.requireNonNull(awsService.getSenderGridApiKey()).senderGridApiKey());
        Request request = new Request();

        // create a thymeleaf context and set the dynamic data
        Context context = new Context();
        context.setVariable(RECIPIENT_NAME, emailContent.recipientName());
        context.setVariable(VERIFICATION_LINK, emailContent.url());
        //process the Thymeleaf template with dynamic data
        String htmlContent = templateEngine.process(TEMPLATE_FILE_VERIFY_ACCOUNT, context);

        // sendgrid handle
        Content content = new Content(FILE_TYPE, htmlContent);
        Mail mail = new Mail(from, emailContent.subject(), toEmail, content);
        request.setMethod(Method.POST);
        request.setEndpoint(MAIL_GRID_ENDPOINT);
        try {
            request.setBody(mail.build());
            sendGrid.api(request);
        } catch (IOException e) {
            log.error(EMAIL_ERROR_MESSAGE_PREFIX, e.getMessage());
        }

    }

    @Override
    public void sendEmailForResetPassword(EmailContent emailContent) {
        Email from = new Email(configProperties().emailSender());
        Email toEmail = new Email(emailContent.toEmail());
        SendGrid sendGrid = new SendGrid(Objects.requireNonNull(awsService.getSenderGridApiKey()).senderGridApiKey());
        Request request = new Request();

        // create a thymeleaf context and set the dynamic data
        Context context = new Context();
        context.setVariable(RECIPIENT_NAME, emailContent.recipientName());
        context.setVariable(VERIFICATION_LINK, emailContent.url());
        //process the Thymeleaf template with dynamic data
        String htmlContent = templateEngine.process(TEMPLATE_FILE_RESET_PASSWORD, context);

        // sendgrid handle
        Content content = new Content(FILE_TYPE, htmlContent);
        Mail mail = new Mail(from, emailContent.subject(), toEmail, content);
        request.setMethod(Method.POST);
        request.setEndpoint(MAIL_GRID_ENDPOINT);

        try {
            request.setBody(mail.build());
            sendGrid.api(request);
        } catch (IOException e) {
            log.error(EMAIL_ERROR_MESSAGE_PREFIX, e.getMessage());
        }
    }
}

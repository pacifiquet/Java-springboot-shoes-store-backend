package com.store.email.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.store.config.AwsService;
import com.store.email.EmailContent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Objects;

import static com.store.utils.Constants.EMAIL_CONFIG_SENDER_GRID;
import static com.store.utils.Constants.EMAIL_ERROR_MESSAGE_PREFIX;
import static com.store.utils.Constants.EMAIL_LINK_ACTION;
import static com.store.utils.Constants.EMAIL_PURPOSE;
import static com.store.utils.Constants.EMAIL_SEND_STATUS_CODE;
import static com.store.utils.Constants.FILE_TYPE;
import static com.store.utils.Constants.HAVING_VALUE_TRUE;
import static com.store.utils.Constants.MAIL_GRID_ENDPOINT;
import static com.store.utils.Constants.RECIPIENT_NAME;
import static com.store.utils.Constants.TEMPLATE_FILE_VERIFY_ACCOUNT;

@Slf4j
@ConditionalOnProperty(name = EMAIL_CONFIG_SENDER_GRID, havingValue = HAVING_VALUE_TRUE, matchIfMissing = true)
@Service
public record EmailService(AwsService awsService,
                           TemplateEngine templateEngine
) implements IEmailService {
    @Override
    public void sendEmail(EmailContent emailContent) {
        Email from = new Email(Objects.requireNonNull(awsService.getSenderGridApiKey()).senderGridEmail());
        Email toEmail = new Email(emailContent.toEmail());
        SendGrid sendGrid = new SendGrid(Objects.requireNonNull(awsService.getSenderGridApiKey()).senderGridApiKey());
        Request request = new Request();

        // create a thymeleaf context and set the dynamic data
        Context context = new Context();
        context.setVariable(RECIPIENT_NAME, emailContent.recipientName());
        context.setVariable(EMAIL_LINK_ACTION, emailContent.url());
        context.setVariable(EMAIL_PURPOSE, emailContent.emailPurpose());
        //process the Thymeleaf template with dynamic data
        String htmlContent = templateEngine.process(TEMPLATE_FILE_VERIFY_ACCOUNT, context);

        // sendgrid handle
        Content content = new Content(FILE_TYPE, htmlContent);
        Mail mail = new Mail(from, emailContent.subject(), toEmail, content);
        request.setMethod(Method.POST);
        request.setEndpoint(MAIL_GRID_ENDPOINT);
        try {
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            log.info(EMAIL_SEND_STATUS_CODE, response.getStatusCode());
        } catch (IOException e) {
            log.error(EMAIL_ERROR_MESSAGE_PREFIX, e.getMessage());
        }

    }

}

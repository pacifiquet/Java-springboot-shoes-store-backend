package com.store.email.service;

import com.store.email.EmailContent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import static com.store.utils.Constants.EMAIL_CONFIG_SENDER_GRID;
import static com.store.utils.Constants.EMAIL_LOG_TEST_ENV;
import static com.store.utils.Constants.HAVING_VALUE_FALSE;

@Slf4j
@ConditionalOnProperty(name = EMAIL_CONFIG_SENDER_GRID, havingValue = HAVING_VALUE_FALSE, matchIfMissing = true)
@Component
public record MockEmailService() implements IEmailService {
    @Override
    public void sendEmail(EmailContent emailContent) {
        log.info(EMAIL_LOG_TEST_ENV, emailContent);
    }

}

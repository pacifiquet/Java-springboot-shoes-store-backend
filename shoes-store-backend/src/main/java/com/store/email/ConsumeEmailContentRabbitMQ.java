package com.store.email;

import com.store.email.service.IEmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import static com.store.utils.Constants.USER_EVENT_QUEUE;

@Component
@Slf4j
public record ConsumeEmailContentRabbitMQ(IEmailService emailService) {

    @RabbitListener(queues = USER_EVENT_QUEUE)
    public void consumeEmailContentFromQueue(EmailContent emailContent) {
        emailService.sendEmail(emailContent);
        log.info("queue name: {}, and message content : {}", USER_EVENT_QUEUE, emailContent);

    }
}

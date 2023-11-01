package com.store.events.listener;

import com.store.events.RegistrationCompleteEvent;
import com.store.user.models.User;
import com.store.user.service.IVerificationTokenService;
import com.store.utils.RabbitMQUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public record RegistrationCompleteEventListener(
        IVerificationTokenService verificationTokenService,
        RabbitTemplate rabbitTemplate
) implements ApplicationListener<RegistrationCompleteEvent> {
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        verificationTokenService.saveVerificationToken(token, user);
        // Send Email to user
        RabbitMQUtils.sendUserRegisterVerifyEventContentToRabbitMQ(user, token, event.getServletRequest(), rabbitTemplate);
    }
}

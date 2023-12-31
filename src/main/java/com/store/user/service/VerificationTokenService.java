package com.store.user.service;

import com.store.exceptions.UserException;
import com.store.user.models.User;
import com.store.user.models.VerificationToken;
import com.store.user.repository.IUserRepository;
import com.store.user.repository.IVerificationTokenRepository;
import com.store.utils.RabbitMQUtils;
import com.store.utils.UserVerificationUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Map;
import java.util.UUID;

import static com.store.utils.Constants.EXPIRED_TOKEN;
import static com.store.utils.Constants.INVALID_TOKEN;
import static com.store.utils.Constants.SUCCESS;
import static com.store.utils.Constants.SUCCESS_VERIFIED_MESSAGE;
import static com.store.utils.Constants.VERIFY_ACCOUNT_MESSAGE;

@Service
public record VerificationTokenService(
        IVerificationTokenRepository verificationTokenRepository,
        RabbitTemplate rabbitTemplate,
        HttpServletRequest httpServletRequest,
        IUserRepository userRepository) implements IVerificationTokenService {
    @Override
    public void saveVerificationToken(String token, User user) {
        VerificationToken verificationToken = VerificationToken.builder()
                .token(token)
                .user(user)
                .expirationTime(UserVerificationUtils.calculateTokenExpirationDate())
                .build();
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public Map<String, String> validateVerificationToken(String token) {
        VerificationToken userToken = verificationTokenRepository.findByToken(token);

        if (userToken == null) {
            throw  new UserException(INVALID_TOKEN);
        }else if (!userToken.getToken().equals(token)){
            throw new UserException(INVALID_TOKEN);
        }

        boolean isTokenExpired = userToken.getExpirationTime().getTime() - Calendar.getInstance().getTime().getTime() <= 0;
        if (isTokenExpired) {
            throw new UserException(EXPIRED_TOKEN);
        }

        User user = userToken.getUser();

        user.setEnabled(true);
        userRepository.save(user);
        verificationTokenRepository.delete(userToken);
        return Map.of(SUCCESS, SUCCESS_VERIFIED_MESSAGE);
    }

    @Override
    public Map<String, String> requestNewToken(String oldToken) {
        VerificationToken userToken = verificationTokenRepository.findByToken(oldToken);
        if (userToken == null) {
            throw  new UserException(INVALID_TOKEN);
        }else if (!userToken.getToken().equals(oldToken)){
            throw new UserException(INVALID_TOKEN);
        }

        User user = userToken.getUser();
        String token = UUID.randomUUID().toString();
        userToken.setToken(token);
        userToken.setExpirationTime(UserVerificationUtils.calculateTokenExpirationDate());
        verificationTokenRepository.save(userToken);

        RabbitMQUtils.sendUserRegisterVerifyEventContentToRabbitMQ(user, token, httpServletRequest, rabbitTemplate);

        return Map.of(SUCCESS, VERIFY_ACCOUNT_MESSAGE);
    }

}

package com.store.user.service;

import com.store.exceptions.UserException;
import com.store.user.dto.PasswordRequest;
import com.store.user.dto.PasswordRestRequest;
import com.store.user.models.PasswordResetToken;
import com.store.user.models.User;
import com.store.user.repository.IPasswordResetTokenRepository;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import com.store.utils.RabbitMQUtils;
import com.store.utils.UserVerificationUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Map;
import java.util.UUID;

import static com.store.utils.Constants.ERROR;
import static com.store.utils.Constants.INVALID_OLD_PASSWORD;
import static com.store.utils.Constants.INVALID_TOKEN;
import static com.store.utils.Constants.RESET_PASSWORD_MESSAGE;
import static com.store.utils.Constants.SAME_AS_OLD_PASSWORD;
import static com.store.utils.Constants.SUCCESS;
import static com.store.utils.Constants.SUCCESS_CHANGED_PASSWORD;
import static com.store.utils.Constants.USER_NOT_FOUND;

@Service
public record PasswordResetTokenService(
        IUserRepository userRepository,
        IPasswordResetTokenRepository passwordResetTokenRepository,
        HttpServletRequest servletRequest,
        PasswordEncoder passwordEncoder,
        RabbitTemplate rabbitTemplate
) implements IPasswordResetTokenService {
    @Override
    public Map<String, String> resetPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expirationTime(UserVerificationUtils.calculateTokenExpirationDate())
                .build();
        passwordResetTokenRepository.save(resetToken);

        user.setEnabled(false);
        userRepository.save(user);
        RabbitMQUtils.sendUserRestPasswordEventContentToRabbitMQ(user, token, servletRequest, rabbitTemplate);

        return Map.of(SUCCESS, RESET_PASSWORD_MESSAGE);
    }

    @Override
    public Map<String, String> savePassword(String token, PasswordRestRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(() -> new UserException(INVALID_TOKEN));
        User user = resetToken.getUser();

        if (passwordEncoder.matches(request.password(), user.getPassword())) {
            return Map.of(ERROR, SAME_AS_OLD_PASSWORD);
        }

        if (resetToken.getExpirationTime().getTime() - Calendar.getInstance().getTime().getTime() <= 0) {
            passwordResetTokenRepository.delete(resetToken);
            return Map.of(ERROR, INVALID_TOKEN);
        }


        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEnabled(true);
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);

        return Map.of(SUCCESS, SUCCESS_CHANGED_PASSWORD);
    }

    @Override
    public Map<String, String> changePassword(PasswordRequest request, CustomerUserDetailsService detailsService) {
        User user = userRepository.findByEmail(detailsService.getEmail()).orElseThrow(() -> new UserException(USER_NOT_FOUND));

        if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
            return Map.of(ERROR, SAME_AS_OLD_PASSWORD);
        }

        if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
            return Map.of(ERROR, INVALID_OLD_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        return Map.of(SUCCESS, SUCCESS_CHANGED_PASSWORD);
    }
}

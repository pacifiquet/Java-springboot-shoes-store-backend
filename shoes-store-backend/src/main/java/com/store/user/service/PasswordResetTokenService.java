package com.store.user.service;

import com.store.email.EmailContent;
import com.store.email.service.IEmailService;
import com.store.exceptions.UserException;
import com.store.user.dto.PasswordRequest;
import com.store.user.models.PasswordResetToken;
import com.store.user.models.User;
import com.store.user.repository.IPasswordResetTokenRepository;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import com.store.user.utils.UserVerificationUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import static com.store.user.utils.Constants.ERROR;
import static com.store.user.utils.Constants.INVALID_OLD_PASSWORD;
import static com.store.user.utils.Constants.INVALID_TOKEN;
import static com.store.user.utils.Constants.RESET_PASSWORD_SUBJECT;
import static com.store.user.utils.Constants.SAME_AS_OLD_PASSWORD;
import static com.store.user.utils.Constants.SUCCESS;
import static com.store.user.utils.Constants.SUCCESS_CHANGED_PASSWORD;
import static com.store.user.utils.Constants.TOKEN;
import static com.store.user.utils.Constants.USER_NOT_FOUND;

@Service
public record PasswordResetTokenService(
        IUserRepository userRepository,
        IPasswordResetTokenRepository passwordResetTokenRepository,
        HttpServletRequest servletRequest,
        PasswordEncoder passwordEncoder,
        IEmailService emailService
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
        emailService.sendEmailForResetPassword(
                EmailContent.builder()
                        .toEmail(user.getEmail())
                        .url(UserVerificationUtils.getRestPasswordUrl(token,servletRequest))
                        .recipientName(user.getFirstName())
                        .subject(RESET_PASSWORD_SUBJECT)
                        .build()
        );
        return Map.of(TOKEN, token);
    }

    @Override
    public Map<String, String> savePassword(String token, PasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(() -> new UserException(INVALID_TOKEN));
        User user = resetToken.getUser();

        if (passwordEncoder.matches(request.newPassword(), user.getPassword())){
            return Map.of(ERROR,SAME_AS_OLD_PASSWORD);
        }

        if (resetToken.getExpirationTime().getTime()- Calendar.getInstance().getTime().getTime() <=0){
            return Map.of(ERROR,INVALID_TOKEN);
        }

        if (!passwordEncoder.matches(request.oldPassword(),user.getPassword())) {
            return Map.of(ERROR, INVALID_OLD_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setEnabled(true);
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);

        return Map.of(SUCCESS, SUCCESS_CHANGED_PASSWORD);
    }

    @Override
    public Map<String, String> changePassword(PasswordRequest request, CustomerUserDetailsService detailsService) {
        User user = userRepository.findByEmail(detailsService.getEmail()).orElseThrow(() -> new UserException(USER_NOT_FOUND));

        if (passwordEncoder.matches(request.newPassword(), user.getPassword())){
            return Map.of(ERROR,SAME_AS_OLD_PASSWORD);
        }

        if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())){
            return Map.of(ERROR,INVALID_OLD_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        return Map.of(SUCCESS,SUCCESS_CHANGED_PASSWORD);
    }
}

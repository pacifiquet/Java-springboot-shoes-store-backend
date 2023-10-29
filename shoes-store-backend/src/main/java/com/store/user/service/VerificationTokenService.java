package com.store.user.service;

import com.store.user.models.User;
import com.store.user.models.VerificationToken;
import com.store.user.repository.IUserRepository;
import com.store.user.repository.IVerificationTokenRepository;
import com.store.user.utils.UserVerificationUtils;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Map;
import java.util.UUID;

import static com.store.user.utils.Constants.ALREADY_VERIFIED_MESSAGE;
import static com.store.user.utils.Constants.ERROR;
import static com.store.user.utils.Constants.EXPIRED_TOKEN;
import static com.store.user.utils.Constants.INVALID_TOKEN;
import static com.store.user.utils.Constants.SUCCESS;
import static com.store.user.utils.Constants.SUCCESS_VERIFIED_MESSAGE;
import static com.store.user.utils.Constants.TOKEN;

@Service
public record VerificationTokenService(
        IVerificationTokenRepository verificationTokenRepository,
        IUserRepository userRepository) implements IVerificationTokenService{
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

        if (userToken == null){
            return Map.of(ERROR,INVALID_TOKEN);
        }

        boolean isTokenExpired = userToken.getExpirationTime().getTime() - Calendar.getInstance().getTime().getTime() <= 0;
        if (isTokenExpired){
            return Map.of(ERROR,EXPIRED_TOKEN);
        }

        User user = userToken.getUser();
        if (user.isEnabled()){
            verificationTokenRepository.delete(userToken);
            return Map.of(SUCCESS,ALREADY_VERIFIED_MESSAGE);
        }

        user.setEnabled(true);
        userRepository.save(user);
        return Map.of(SUCCESS,SUCCESS_VERIFIED_MESSAGE);
    }

    @Override
    public Map<String, String> requestNewToken(String oldToken) {
        VerificationToken userToken = verificationTokenRepository.findByToken(oldToken);
        if (userToken == null){
            return Map.of(SUCCESS,INVALID_TOKEN);
        }
        String token = UUID.randomUUID().toString();
        userToken.setToken(token);
        verificationTokenRepository.save(userToken);
        return Map.of(TOKEN,token);
    }

}

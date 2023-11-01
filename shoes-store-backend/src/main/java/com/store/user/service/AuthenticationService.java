package com.store.user.service;

import com.store.config.StoreConfigProperties;
import com.store.exceptions.UserException;
import com.store.user.dto.LoginRequest;
import com.store.user.dto.LoginResponse;
import com.store.user.dto.MessageResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import com.store.user.security.jwt.IJwtService;
import com.store.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final IUserRepository userRepository;
    private final IJwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest request;
    private final StoreConfigProperties storeConfigProperties;


    /**
     * this method handle user login functionality
     *
     * @param request holds login credentials
     * @return login object response
     */
    @Override
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        if (!authentication.isAuthenticated()) {
            return null;
        }

        User user = userRepository.findByEmail(request.email()).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        UserDetails userDetails = CustomerUserDetailsService.build(user);


        String token = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("token", token);
        tokens.put("refreshToken", refreshToken);
        return new LoginResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole().name(), user.getProfile(), tokens);

    }

    /**
     * this method handles the update of normal user to be admin
     *
     * @param email user to be updated email
     * @return successful message
     */
    @Override
    @Transactional
    public MessageResponse makeAdmin(String email) {
        String token = SecurityUtils.extractTokenFromHeader(request);
        String internalApiKey = storeConfigProperties.getAuthenticationKey().getInternalApiKey();
        if (Objects.equals(token, internalApiKey)) {
            userRepository.makeAdmin(email, Role.ADMIN);
            return new MessageResponse("successful updated");
        }
        throw new UserException("INVALID KEY");

    }
}

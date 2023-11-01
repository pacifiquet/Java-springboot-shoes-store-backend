package com.store.config;

import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.security.CustomerUserDetailsService;
import com.store.utils.SecurityUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Set;

public class CustomerUserDetailsServiceArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().isAssignableFrom(CustomerUserDetailsService.class);
    }

    @Override
    public Object resolveArgument(@NotNull MethodParameter parameter, ModelAndViewContainer mavContainer, @NotNull NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        User user = User.builder()
                .id(1L)
                .email("user@gmail.com")
                .firstName("user")
                .lastName("user")
                .role(Role.USER)
                .password("pass")
                .enabled(true)
                .build();

        return new CustomerUserDetailsService(
                user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(),
                user.getPassword(), user.isEnabled(), Set.of(SecurityUtils.convertToAuthority(Role.USER))
        );
    }
}

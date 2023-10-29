package com.store.events;

import com.store.user.models.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Setter
@Getter
public class RegistrationCompleteEvent extends ApplicationEvent {
    private final User user;
    private final HttpServletRequest servletRequest;
    public RegistrationCompleteEvent(User user, HttpServletRequest servletRequest) {
        super(user);
        this.user = user;
        this.servletRequest = servletRequest;
    }
}

package com.store.user.security;

import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@AllArgsConstructor
@Data
@Builder
public class UserDetailsService implements UserDetails {
    private final long id;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
    private Set<GrantedAuthority> authorities;

    public static UserDetails build(User user) {
        Set<GrantedAuthority> grantedAuthorities = Set.of(SecurityUtils.convertToAuthority(user.getRole()));
        return new UserDetailsService(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                grantedAuthorities
        );
    }

    public static UserDetails createSuperUser() {
        Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority(Role.SYSTEM_ADMIN));
        return UserDetailsService.builder()
                .id(-1L)
                .firstName("user")
                .lastName("system-admin")
                .email("admin@gmail.com")
                .authorities(authorities)
                .build();

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }
}

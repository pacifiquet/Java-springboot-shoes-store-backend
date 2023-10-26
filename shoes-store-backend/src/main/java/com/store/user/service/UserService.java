package com.store.user.service;

import com.store.exceptions.UserException;
import com.store.user.dto.MessageResponse;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@AllArgsConstructor
@Service
public class UserService implements IUserService {
    private static final String USER_NOT_FOUND = "user not found";
    private final IUserRepository iuserrepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * this method handles the creation and save user to the database
     *
     * @param request this request is an object of RegisterUserRequest from dto package
     * @return a Long value as in the ID of the user
     */
    @Override
    public long registerUser(RegisterUserRequest request) {
        Optional<User> existUser = iuserrepository.findByEmail(request.email());

        if (existUser.isPresent()){
            throw new UserException("This account exists");
        }

        User user = iuserrepository.save(User.builder()
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build());
        return user.getId();
    }

    /**
     * this method returns all lists of users available in the database,
     * and this method also returns this lists along with sorting functionality
     *
     * @return List of userResponse
     */
    @Override
    public List<UserResponse> getListUsers() {
        List<User> users = iuserrepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return users.stream().map(user -> userResponseHandler().apply(user)).toList();
    }

    /**
     * this method handles user retrieve by id
     * @param userId  this userId is passed through url
     * @param customerUserDetailsService logged user is held in this object
     * @return userResponse object from dto package
     */
    @Override
    public UserResponse getUserById(long userId, CustomerUserDetailsService customerUserDetailsService) {
        if (userId != customerUserDetailsService.getId()){
            throw  new UserException("ACCESS DENIED");
        }

        User user = iuserrepository.findById(userId).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        return userResponseHandler().apply(user);
    }

    /**
     * this method handles user update
     *
     * @param id                 this id fetching the specific user
     * @param request            this request data
     * @param customerUserDetailsService this object holds a logged user object
     * @return a message if update is successful
     */
    @Override
    public MessageResponse updateUser(long id, UpdateUserRequest request, CustomerUserDetailsService customerUserDetailsService) {
        if (id != customerUserDetailsService.getId()){
            throw new UserException("INVALID ACCESS");
        }

        User user = iuserrepository.findById(id).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        iuserrepository.save(user);
        return MessageResponse.builder().message("successfully updated").build();
    }

    /**
     * this method handles the deletion of user
     * @param id an id to identify a user
     * @param customerUserDetailsService this object holds a logged user object
     * @return a message if a user is found and deleted successful
     */
    @Override
    public MessageResponse deleteUser(long id, CustomerUserDetailsService customerUserDetailsService) {
        if (id != customerUserDetailsService.getId()){
            throw new UserException("INVALID ACCESS");
        }

        User user = iuserrepository.findById(id).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        iuserrepository.delete(user);
        return MessageResponse.builder().message("successfully deleted").build();

    }

    /**
     * this method handles the conversion from a user object to a dto
     * user response object
     * @return userResponse object
     */
    private static Function<User, UserResponse> userResponseHandler() {
        return user -> new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole().name(), user.getCreatedAt().toString());
    }
}

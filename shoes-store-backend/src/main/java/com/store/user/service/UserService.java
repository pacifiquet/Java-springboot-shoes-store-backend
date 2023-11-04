package com.store.user.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.config.AwsConfigProperties;
import com.store.events.RegistrationCompleteEvent;
import com.store.exceptions.UserException;
import com.store.user.dto.RegisterUserRequest;
import com.store.user.dto.UpdateUserRequest;
import com.store.user.dto.UserResponse;
import com.store.user.models.Role;
import com.store.user.models.User;
import com.store.user.repository.IUserRepository;
import com.store.user.security.CustomerUserDetailsService;
import com.store.utils.FileHandlerUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import static com.store.utils.Constants.ACCESS_DENIED;
import static com.store.utils.Constants.ACCOUNT_EXIST;
import static com.store.utils.Constants.ADDRESS;
import static com.store.utils.Constants.FAILED_TO_UPDATE_USER;
import static com.store.utils.Constants.FIRST_NAME;
import static com.store.utils.Constants.LAST_NAME;
import static com.store.utils.Constants.OTHER_USER_INFO;
import static com.store.utils.Constants.SUCCESS;
import static com.store.utils.Constants.SUCCESSFULLY_DELETED;
import static com.store.utils.Constants.SUCCESSFULLY_UPDATED;
import static com.store.utils.Constants.USER_NOT_FOUND;
import static com.store.utils.Constants.VERIFY_ACCOUNT_MESSAGE;

@AllArgsConstructor
@Service
@Slf4j
public class UserService implements IUserService {
    private final IUserRepository iuserrepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher publisher;
    private final AmazonS3 s3Client;
    private final AwsConfigProperties awsConfigProperties;
    private final ObjectMapper objectMapper;

    /**
     * this method handles the creation and save user to the database
     *
     * @param request        this request is an object of RegisterUserRequest from dto package
     * @param servletRequest this http request that will help to get the application url
     * @return a Long value as in the ID of the user
     */
    @Override
    public Map<String, String> registerUser(RegisterUserRequest request, HttpServletRequest servletRequest) {
        Optional<User> existUser = iuserrepository.findByEmail(request.email());

        if (existUser.isPresent()) {
            throw new UserException(ACCOUNT_EXIST);
        }

        User user = iuserrepository.save(User.builder()
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .address(request.address())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER).enabled(false)
                .createdAt(LocalDateTime.now()).build());
        publisher.publishEvent(new RegistrationCompleteEvent(user, servletRequest));
        return Map.of(SUCCESS, VERIFY_ACCOUNT_MESSAGE);
    }

    /**
     * this method handles user retrieve by id
     *
     * @param userId                     this userId is passed through url
     * @param customerUserDetailsService logged user is held in this object
     * @return userResponse object from dto package
     */
    @Override
    public UserResponse getUserById(long userId, CustomerUserDetailsService customerUserDetailsService) {
        if (userId != customerUserDetailsService.getId()) {
            throw new UserException(ACCESS_DENIED);
        }

        User user = iuserrepository.findById(userId).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        return userResponseHandler().apply(user);
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
     * this method handles user update
     *
     * @param id                         this id fetching the specific user
     * @param customerUserDetailsService this object holds a logged user object
     * @param otherUserInfo              this is a map of user meta-data
     * @param profileUpdate              user profile
     * @return a message if update is successful
     */
    @Override
    public UserResponse updateUser(long id, CustomerUserDetailsService customerUserDetailsService, MultipartFile profileUpdate, Map<String, String> otherUserInfo) {
        if (id != customerUserDetailsService.getId()) {
            throw new UserException(ACCESS_DENIED);
        }

        User user = iuserrepository.findById(id).orElseThrow(() -> new UserException(USER_NOT_FOUND));


        if (profileUpdate != null) {
            File profileObj = FileHandlerUtils.convertMultiPartFileToFile(profileUpdate);
            String fileName = user.getFirstName().toLowerCase() + "_" + profileUpdate.getOriginalFilename();
            s3Client.putObject(new PutObjectRequest(awsConfigProperties.bucketName(), fileName, profileObj));
            user.setProfile(awsConfigProperties.bucketUrlEndpoint() + fileName);
            profileObj.delete();
        }

        try {
            UpdateUserRequest updateUserRequest = objectMapper.readValue(otherUserInfo.get(OTHER_USER_INFO), UpdateUserRequest.class);
            user.setLastName(updateUserRequest.lastName());
            user.setFirstName(updateUserRequest.firstName());
            user.setAddress(updateUserRequest.address());
        }catch (Exception exception){
            log.error(FAILED_TO_UPDATE_USER,exception.getMessage());
        }


        User saved = iuserrepository.save(user);
        return userResponseHandler().apply(saved);
    }

    /**
     * this method handles the deletion of user
     *
     * @param id                         an id to identify a user
     * @param customerUserDetailsService this object holds a logged user object
     * @return a message if a user is found and deleted successful
     */
    @Override
    public Map<String, String> deleteUser(long id, CustomerUserDetailsService customerUserDetailsService) {
        if (id != customerUserDetailsService.getId()) {
            throw new UserException(ACCESS_DENIED);
        }

        User user = iuserrepository.findById(id).orElseThrow(() -> new UserException(USER_NOT_FOUND));
        if (user.getProfile() !=null){
            int indexOf = user.getProfile().indexOf(user.getFirstName().toLowerCase());
            s3Client.deleteObject(awsConfigProperties.bucketName(), user.getProfile().substring(indexOf));
        }

        iuserrepository.delete(user);
        return Map.of(SUCCESS, SUCCESSFULLY_DELETED);

    }

    /**
     * this method handles the conversion from a user object to a dto
     * user response object
     *
     * @return userResponse object
     */
    private static Function<User, UserResponse> userResponseHandler() {
        return user -> new UserResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole().name(), user.getAddress(), user.getProfile(), user.getCreatedAt().toString());
    }
}

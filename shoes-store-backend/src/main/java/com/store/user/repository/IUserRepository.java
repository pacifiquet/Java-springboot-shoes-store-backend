package com.store.user.repository;

import com.store.user.models.Role;
import com.store.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    @Modifying
    @Query("update User u set u.role =:role where u.email =:email")
    void makeAdmin(@Param("email")String email, @Param("role")Role role);
}

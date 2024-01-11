package com.accolite.server.models.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(Long userId);

    Optional<User> findByEmail(String email);

    List<User> findByHrId(Long hrId);

    List<User> findByReportingManagerId(Long reportingManagerId);

}

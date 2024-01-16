package com.accolite.server.controllers;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.models.GoogleTokenPayload;
import com.accolite.server.models.User;
import com.accolite.server.readers.UserExcelReader;
import com.accolite.server.repository.UserRepository;
import com.accolite.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<User> users = UserExcelReader.readUsersFromExcel(file);
            userService.saveAll(users);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserDetails(@PathVariable Long userId) {
        User user = userService.getUserDetails(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUserDetails(@PathVariable Long userId, @RequestBody User updatedUser) {
        User user = userService.updateUser(userId, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{userId}/hierarchy")
    public ResponseEntity<List<User>> getUserHierarchy(@PathVariable Long userId) {
        List<User> hierarchy = userService.getUserHierarchy(userId);
        return new ResponseEntity<>(hierarchy, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailExists(@RequestBody GoogleTokenPayload googleTokenPayload) {
        Optional<User> emailExists = userRepository.findByEmail(googleTokenPayload.getEmail());
        System.out.println(googleTokenPayload.getEmail());
        boolean exists = false;
        if(emailExists.isPresent()){
            exists = true;
        }
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/userById/{userId}")
    public ResponseEntity<User> getGoalPlanById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/userById/{userId}")
    public ResponseEntity<User> updateGoalPlan(@PathVariable Long userId, @RequestBody User updatedUser) {
        User existingUser = userService.getUserById(userId);

        if (existingUser != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedUser.setUserId(existingUser.getUserId());
            // ... (set other fields accordingly)

            User savedUser = userRepository.save(updatedUser); // Assuming you have a method like this

            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
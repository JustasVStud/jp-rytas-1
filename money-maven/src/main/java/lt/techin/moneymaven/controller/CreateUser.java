package lt.techin.moneymaven.controller;

import lt.techin.moneymaven.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import lt.techin.moneymaven.model.User;

public class CreateUser {

    private final UserRepository userRepository;

    public CreateUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    record NewUserRequest(Integer id, String userName, String password, boolean isAdmin) {
    }

    @PostMapping
    public void addCustomer(@RequestBody NewUserRequest request) {
        User user = new User();
        user.setUserId(request.id());
        user.setUsername(request.userName());
        user.setPassword(request.password());
        user.setAdmin(request.isAdmin());
        userRepository.save(user);
    }
}

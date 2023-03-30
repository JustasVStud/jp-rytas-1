package lt.techin.moneymaven.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.ArrayList;

import lt.techin.moneymaven.model.User;

public class CreateUser {
    List<User> users;

    {
        users = new ArrayList<>();
    }
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        users.add(user);
        ResponseEntity<User> body = ResponseEntity.status(HttpStatus.CREATED).body(user);
        return body;
    }
}

package lt.techin.moneymaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.moneymaven.model.User;
import lt.techin.moneymaven.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/all")
	public List<User> getAllUsers(){
			return userRepository.findAll();
	}
}

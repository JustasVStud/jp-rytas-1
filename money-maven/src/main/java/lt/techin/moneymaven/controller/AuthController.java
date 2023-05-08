package lt.techin.moneymaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lt.techin.moneymaven.model.User;
import lt.techin.moneymaven.payload.request.LoginRequest;
import lt.techin.moneymaven.payload.request.SignupRequest;
import lt.techin.moneymaven.payload.response.JwtResponse;
import lt.techin.moneymaven.payload.response.MessageResponse;
import lt.techin.moneymaven.repository.UserRepository;
import lt.techin.moneymaven.security.jwt.JwtUtils;
import lt.techin.moneymaven.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		
		List<String> authorities = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.toList();
		
		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getUserId(),
												 userDetails.getUsername(),
												 authorities));
		}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken."));
		}
		
		User user = new User(signUpRequest.getUsername(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getIsAdmin());
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully"));
	}
}

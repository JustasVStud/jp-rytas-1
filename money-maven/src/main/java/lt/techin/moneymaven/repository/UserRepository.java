package lt.techin.moneymaven.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String userName);
	
	Boolean existsByUsername(String username);
}

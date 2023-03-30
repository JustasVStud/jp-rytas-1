package lt.techin.moneymaven.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByUsername(String userName);
}

package lt.techin.moneymaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Integer> {
	
}

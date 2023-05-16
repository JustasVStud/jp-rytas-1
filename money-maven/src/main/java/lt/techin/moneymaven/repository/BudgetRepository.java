package lt.techin.moneymaven.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Integer>{
	Page<Budget> findAllByUser_userId(Pageable pageable, Integer userId);
}

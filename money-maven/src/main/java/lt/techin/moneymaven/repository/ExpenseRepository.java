package lt.techin.moneymaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
}

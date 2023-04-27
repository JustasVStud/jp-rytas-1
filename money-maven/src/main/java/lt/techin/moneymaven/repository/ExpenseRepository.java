package lt.techin.moneymaven.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
	@Query("SELECT e FROM Expense e JOIN e.expenseType et WHERE et.typeName = :expenseTypeName")
    Page<Expense> findByExpenseTypeName(@Param("expenseTypeName") String expenseTypeName, Pageable pageable);

}

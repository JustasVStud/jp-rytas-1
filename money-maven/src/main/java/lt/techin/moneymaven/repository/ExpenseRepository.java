package lt.techin.moneymaven.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
	@Query("SELECT e FROM Expense e JOIN e.expenseType et WHERE et.typeName = :expenseTypeName")
	Page<Expense> findByExpenseTypeName(@Param("expenseTypeName") String expenseTypeName, Pageable pageable);
	
	Page<Expense> findByExpenseDatetimeGreaterThanEqual(LocalDateTime startDate, Pageable pageable);
	
	Page<Expense> findByExpenseDatetimeLessThanEqual(LocalDateTime endDate, Pageable pageable);
	
	Page<Expense> findByExpenseDatetimeBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
	
	@Query("SELECT e FROM Expense e JOIN e.expenseType et WHERE et.typeName = :expenseTypeName AND e.expenseDatetime BETWEEN :startDate AND :endDate")
	Page<Expense> findByExpenseTypeNameAndExpenseDatetimeBetween(
			@Param("expenseTypeName") String expenseTypeName,
			@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate,
			Pageable pageable
	);
	
	@Query("SELECT e FROM Expense e JOIN e.expenseType et WHERE et.typeName = :expenseTypeName AND e.expenseDatetime > :startDate")
	Page<Expense> findByExpenseTypeNameAndExpenseDatetimeAfter(
			@Param("expenseTypeName") String expenseTypeName,
			@Param("startDate") LocalDateTime startDate,
			Pageable pageable
	);
	
	@Query("SELECT e FROM Expense e JOIN e.expenseType et WHERE et.typeName = :expenseTypeName AND e.expenseDatetime < :endDate")
	Page<Expense> findByExpenseTypeNameAndExpenseDatetimeBefore(
			@Param("expenseTypeName") String expenseTypeName,
			@Param("endDate") LocalDateTime endDate,
			Pageable pageable
	);
	
}

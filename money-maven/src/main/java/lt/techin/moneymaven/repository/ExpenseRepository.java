package lt.techin.moneymaven.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
	@Query("SELECT e FROM Expense e " +
	           "WHERE (:expenseTypeName IS NULL OR e.expenseType.typeName = :expenseTypeName) " +
	           "AND (:startDate IS NULL OR e.expenseDatetime >= :startDate) " +
	           "AND (:endDate IS NULL OR e.expenseDatetime <= :endDate) " +
	           "AND e.user.userId = :userId")
	    Page<Expense> findExpenses(Pageable pageable,
	                               @Param("expenseTypeName") String expenseTypeName,
	                               @Param("startDate") LocalDateTime startDate,
	                               @Param("endDate") LocalDateTime endDate,
	                               @Param("userId") Integer userId);
	
}

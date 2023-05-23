package lt.techin.moneymaven.repository;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Budget;
import lt.techin.moneymaven.model.ExpenseType;
import lt.techin.moneymaven.model.User;

public interface BudgetRepository extends JpaRepository<Budget, Integer>{
	Page<Budget> findAllByUser_userId(Pageable pageable, Integer userId);
	
	Optional<Budget> findByUserAndExpenseType(User user, ExpenseType expenseType);
	
	List<Budget> findByBudgetMonthBefore(LocalDate date);
	
	@Query("SELECT b.budgetAmount FROM Budget b " +
	           "WHERE b.user.userId = :userId " +
	           "AND (:expenseTypeName IS NULL OR b.expenseType.typeName = :expenseTypeName)")
	    Optional<BigDecimal> getBudgetAmount(@Param("userId") Integer userId,
	                               @Param("expenseTypeName") String expenseTypeName);
	
}

package lt.techin.moneymaven.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>{
	
	Page<Expense> findAllByUser_UserId(Integer userId, Pageable pageable);
	
    Page<Expense> findByExpenseType_TypeNameAndUser_UserId(String expenseTypeName, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseDatetimeBetweenAndUser_UserId(LocalDateTime startDate, LocalDateTime endDate, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseDatetimeGreaterThanEqualAndUser_UserId(LocalDateTime startDate, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseDatetimeLessThanEqualAndUser_UserId(LocalDateTime endDate, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseType_TypeNameAndExpenseDatetimeBetweenAndUser_UserId(
            String expenseTypeName, LocalDateTime startDate, LocalDateTime endDate, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseType_TypeNameAndExpenseDatetimeGreaterThanEqualAndUser_UserId(
            String expenseTypeName, LocalDateTime startDate, Integer userId, Pageable pageable);

    Page<Expense> findByExpenseType_TypeNameAndExpenseDatetimeLessThanEqualAndUser_UserId(
            String expenseTypeName, LocalDateTime endDate, Integer userId, Pageable pageable);
	
}

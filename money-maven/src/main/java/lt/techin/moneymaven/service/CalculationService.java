package lt.techin.moneymaven.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.repository.BudgetRepository;
import lt.techin.moneymaven.repository.ExpenseRepository;
import lt.techin.moneymaven.repository.IncomeRepository;

@Service
public class CalculationService {
	
	@Autowired
	ExpenseTypeService expenseTypeService;
	
	@Autowired
	IncomeRepository incomeRepository;
	
	@Autowired
	ExpenseRepository expenseRepository;
	
	@Autowired
	BudgetRepository budgetRepository;
	
	public BigDecimal getTotalIncome(Integer userId, LocalDateTime startDate, LocalDateTime endDate) {
		return incomeRepository.getTotalIncome(userId, startDate, endDate)
				.orElse(BigDecimal.ZERO);
	}
	
	public BigDecimal getTotalExpense(Integer userId, LocalDateTime startDate, LocalDateTime endDate, String expenseTypeName) {
		return expenseRepository.getTotalExpense(userId, startDate, endDate, expenseTypeName)
				.orElse(BigDecimal.ZERO);
	}
	
	public BigDecimal getBudgetRemainder(Integer userId, String expenseTypeName) {
		 	LocalDateTime now = LocalDateTime.now();
	        // Get the start of the current month
	        LocalDateTime startOfMonth = now.with(TemporalAdjusters.firstDayOfMonth())
	                                      .withHour(0)
	                                      .withMinute(0)
	                                      .withSecond(0);
	        // Get the end of the current month
	        LocalDateTime endOfMonth = now.with(TemporalAdjusters.lastDayOfMonth())
	                                      .withHour(23)
	                                      .withMinute(59)
	                                      .withSecond(59);
		
		BigDecimal budgetAmount = budgetRepository.getBudgetAmount(userId, expenseTypeName)
				.orElse(BigDecimal.ZERO);
		
		BigDecimal expenseAmount = getTotalExpense(userId, startOfMonth, endOfMonth, expenseTypeName);
		
		return budgetAmount.subtract(expenseAmount);
		
	}
	
}

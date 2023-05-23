package lt.techin.moneymaven.service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.BudgetDto;
import lt.techin.moneymaven.exception.BudgetNotFoundException;
import lt.techin.moneymaven.exception.DuplicateBudgetException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
import lt.techin.moneymaven.exception.UnauthorizedAccessException;
import lt.techin.moneymaven.exception.UserNotFoundException;
import lt.techin.moneymaven.model.Budget;
import lt.techin.moneymaven.model.ExpenseType;
import lt.techin.moneymaven.model.User;
import lt.techin.moneymaven.repository.BudgetRepository;
import lt.techin.moneymaven.repository.UserRepository;

@Service
public class BudgetService {
	@Autowired
	private BudgetRepository budgetRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExpenseTypeService expenseTypeService;
	
	@Autowired 
	private ModelMapper modelMapper;
	
	@Autowired
	private CalculationService calculationService;
	
	
	public Page<BudgetDto> getBudgetsPage(Pageable pageable, Integer userId){
		Page<Budget> budgets = budgetRepository.findAllByUser_userId(pageable, userId);
		if(budgets.isEmpty()) {
			throw new NoEntriesFoundException("budgets");
		}
		return budgets.map(this::mapToBudgetDto);
	}
	
	public BudgetDto getBudgetById(Integer id, Integer userId) {
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(() -> new BudgetNotFoundException("Budget Id", id));
		
		if (!budget.getUser().getUserId().equals(userId)) {
			throw new UnauthorizedAccessException("Budget", id, userId);
		}
		return mapToBudgetDto(budget);
	}
	
	public BudgetDto createBudget(BudgetDto budgetDto, Integer userId) {
		Budget budget = new Budget();
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User Id" , userId));
		ExpenseType expenseType = modelMapper.map(
				expenseTypeService.getExpenseTypeByName(
						budgetDto.getExpenseTypeName()), ExpenseType.class
				);
		budgetRepository.findByUserAndExpenseType(user, expenseType)
		.ifPresent(budgetWithExpenseType -> {throw new DuplicateBudgetException(budgetWithExpenseType.getExpenseType().getTypeName());});
		
		budget.setUser(user);
		budget.setExpenseType(expenseType);
		budget.setBudgetAmount(budgetDto.getBudgetAmount());
		budget.setBudgetMonth(LocalDate.now());
		Budget savedBudget = budgetRepository.save(budget);
		return modelMapper.map(savedBudget, BudgetDto.class);
	}
	
	public BudgetDto updateBudget(Integer id, BudgetDto budgetDto, Integer userId) {
		Budget existingBudget = budgetRepository.findById(id)
				.orElseThrow(() -> new BudgetNotFoundException("Budget id", id));
		
		if (!existingBudget.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedAccessException("Budget", id, userId);
        }
		
		ExpenseType expenseType = modelMapper.map(
				expenseTypeService.getExpenseTypeByName(
						budgetDto.getExpenseTypeName()), ExpenseType.class
				);
		
		budgetRepository.findByUserAndExpenseType(existingBudget.getUser(), expenseType)
		.ifPresent(budgetWithExpenseType -> {
			if(budgetWithExpenseType.getBudgetId() != budgetDto.getBudgetId()) {
				throw new DuplicateBudgetException(budgetWithExpenseType.getExpenseType().getTypeName());
			}
		});
		
		existingBudget.setBudgetId(budgetDto.getBudgetId());
		existingBudget.setExpenseType(expenseType);
		existingBudget.setBudgetAmount(budgetDto.getBudgetAmount());
		existingBudget.setBudgetMonth(LocalDate.now());
		
		Budget savedBudget = budgetRepository.save(existingBudget);
		return modelMapper.map(savedBudget, BudgetDto.class);
	}
	
	public void deleteBudget(Integer id, Integer userId) {
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(() -> new BudgetNotFoundException("Budget Id", id));
		
		if (!budget.getUser().getUserId().equals(userId)) {
			throw new UnauthorizedAccessException("Budget", id, userId);
		}
		budgetRepository.delete(budget);
	}
	
	@Scheduled(cron = "0 0 0 1 * ?") // Runs at midnight on the 1st day of every month
	public void deleteOldBudgets() {
		LocalDate currentDate = LocalDate.now();
		LocalDate previousMonth = currentDate.minusMonths(1);

		List<Budget> oldBudgets = budgetRepository.findByBudgetMonthBefore(previousMonth);
		for (Budget budget : oldBudgets) {
			budgetRepository.delete(budget);
		}
	}
	
	private BudgetDto mapToBudgetDto(Budget budget) {
		BudgetDto budgetDto = modelMapper.map(budget, BudgetDto.class);
		
		Integer userId = budget.getUser().getUserId();
		String expenseTypeName = budget.getExpenseType().getTypeName();
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
		
		
		budgetDto.setExpenseAmount(calculationService.getTotalExpense(userId, startOfMonth, endOfMonth, expenseTypeName));
		budgetDto.setBudgetRemainder(calculationService.getBudgetRemainder(userId, expenseTypeName));
		
		return budgetDto;
	}
}

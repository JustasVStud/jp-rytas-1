package lt.techin.moneymaven.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.BudgetDto;
import lt.techin.moneymaven.exception.BudgetNotFoundException;
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
	
	
	public Page<BudgetDto> getBudgetsPage(Pageable pageable, Integer userId){
		Page<Budget> budgets = budgetRepository.findAllByUser_userId(pageable, userId);
		if(budgets.isEmpty()) {
			throw new NoEntriesFoundException("budgets");
		}
		return budgets.map(budget -> modelMapper.map(budget, BudgetDto.class));
	}
	
	public BudgetDto getBudgetById(Integer id, Integer userId) {
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(() -> new BudgetNotFoundException("Budget Id", id));
		
		if (budget.getUser().getUserId().equals(userId)) {
			throw new UnauthorizedAccessException("Budget", id, userId);
		}
		return modelMapper.map(budget, BudgetDto.class);
	}
	
	public BudgetDto createBudget(BudgetDto budgetDto, Integer userId) {
		Budget budget = modelMapper.map(budgetDto, Budget.class);
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User Id" , userId));
		ExpenseType expenseType = modelMapper.map(
				expenseTypeService.getExpenseTypeByName(
						budgetDto.getExpenseTypeName()), ExpenseType.class
				);
		budget.setUser(user);
		budget.setExpenseType(expenseType);
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
		existingBudget.setBudgetId(budgetDto.getBudgetId());
		existingBudget.setExpenseType(expenseType);
		existingBudget.setBudgetAmount(budgetDto.getBudgetAmount());
		existingBudget.setBudgetMonth(budgetDto.getBudgetMonth());
		
		Budget savedBudget = budgetRepository.save(existingBudget);
		return modelMapper.map(savedBudget, BudgetDto.class);
	}
	
	public void deleteBudget(Integer id, Integer userId) {
		Budget budget = budgetRepository.findById(id)
				.orElseThrow(() -> new BudgetNotFoundException("Budget Id", id));
		
		if (budget.getUser().getUserId().equals(userId)) {
			throw new UnauthorizedAccessException("Budget", id, userId);
		}
		budgetRepository.delete(budget);
	}
	
}

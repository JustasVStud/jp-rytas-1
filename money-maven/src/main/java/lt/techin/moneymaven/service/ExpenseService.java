package lt.techin.moneymaven.service;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.ExpenseDto;
import lt.techin.moneymaven.exception.ExpenseNotFoundException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
import lt.techin.moneymaven.exception.UserNotFoundException;
import lt.techin.moneymaven.model.Expense;
import lt.techin.moneymaven.model.ExpenseType;
import lt.techin.moneymaven.model.User;
import lt.techin.moneymaven.repository.ExpenseRepository;
import lt.techin.moneymaven.repository.UserRepository;

@Service
public class ExpenseService {

	@Autowired
	private ExpenseRepository expenseRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExpenseTypeService expenseTypeService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Page<ExpenseDto> getExpensesPage(Pageable pageable, String expenseTypeName, LocalDateTime startDate, LocalDateTime endDate) {
		try {
			Page<Expense> expenses;
			
			if (expenseTypeName != null && startDate != null && endDate != null) {
				expenses = expenseRepository.findByExpenseTypeNameAndExpenseDatetimeBetween(expenseTypeName, startDate, endDate, pageable);
			} else if (expenseTypeName != null && startDate != null) {
				expenses = expenseRepository.findByExpenseTypeNameAndExpenseDatetimeAfter(expenseTypeName, startDate, pageable);
			} else if (expenseTypeName != null && endDate != null) {
				expenses = expenseRepository.findByExpenseTypeNameAndExpenseDatetimeBefore(expenseTypeName, endDate, pageable);
			} else if (startDate != null && endDate != null) {
				expenses = expenseRepository.findByExpenseDatetimeBetween(startDate, endDate, pageable);
			} else if (expenseTypeName != null) {
				expenses = expenseRepository.findByExpenseTypeName(expenseTypeName, pageable);
			} else if (startDate != null) {
				expenses = expenseRepository.findByExpenseDatetimeGreaterThanEqual(startDate, pageable);
			} else if (endDate != null) {
				expenses = expenseRepository.findByExpenseDatetimeLessThanEqual(endDate, pageable);
			} else {
				expenses = expenseRepository.findAll(pageable);
			}
			
			if (expenses.isEmpty()) {
				throw new NoEntriesFoundException("expenses");
			}
			
			return expenses.map(expense -> modelMapper.map(expense, ExpenseDto.class));
		} catch (NoEntriesFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting expenses", e);
		}
	}
	
	public ExpenseDto getExpenseById(Integer id) {
		try {			
			Expense expense = expenseRepository.findById(id)
					.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			return modelMapper.map(expense,  ExpenseDto.class);
		} catch (ExpenseNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting expense", e);
		}
	}
	
	public ExpenseDto createExpense(ExpenseDto expenseDto) {
		try {
			Expense expense = modelMapper.map(expenseDto, Expense.class);
			User user = userRepository.findById(1)
					.orElseThrow(() -> new UserNotFoundException("User Id", 1));
			ExpenseType expenseType = modelMapper.map(
					expenseTypeService.getExpenseTypeByName(
							expenseDto.getExpenseTypeName()), ExpenseType.class
					);
			expense.setUser(user);
			expense.setExpenseType(expenseType);
			Expense savedExpense = expenseRepository.save(expense);
			return modelMapper.map(savedExpense, ExpenseDto.class);
		} catch (UserNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while creating expense", e);
		}
	}
	
	public ExpenseDto updateExpense(Integer id, ExpenseDto expenseDto) {
		try {
			Expense existingExpense = expenseRepository.findById(id)
					.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			
			ExpenseType expenseType = modelMapper.map(
					expenseTypeService.getExpenseTypeByName(
							expenseDto.getExpenseTypeName()), ExpenseType.class
					);
			existingExpense.setExpenseId(expenseDto.getExpenseId());
			existingExpense.setExpenseAmount(expenseDto.getExpenseAmount());
			existingExpense.setExpenseDescription(expenseDto.getExpenseDescription());
			existingExpense.setExpenseType(expenseType);
			existingExpense.setExpenseDatetime(expenseDto.getExpenseDatetime());
			
			Expense savedExpense = expenseRepository.save(existingExpense);
			return modelMapper.map(savedExpense, ExpenseDto.class);
		} catch (ExpenseNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while updating expense", e);
		}
	}
	
	public void deleteExpense(Integer id) {
		try {
			Expense expense = expenseRepository.findById(id)
			.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			expenseRepository.delete(expense);
		} catch (ExpenseNotFoundException e) {
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error while deleting expense", e);
		}
	}
}

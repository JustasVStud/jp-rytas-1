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
import lt.techin.moneymaven.exception.UnauthorizedAccessException;
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
	
	public Page<ExpenseDto> getExpensesPage(
	        Pageable pageable,
	        String expenseTypeName,
	        LocalDateTime startDate,
	        LocalDateTime endDate,
	        Integer userId
	) {
	    try {
	        Page<Expense> expenses;

	        expenses = expenseRepository.findExpenses(pageable, expenseTypeName, startDate, endDate, userId);

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
	
	public ExpenseDto getExpenseById(Integer id, Integer userId) {
		try {			
			Expense expense = expenseRepository.findById(id)
					.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			
			if (!expense.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Expense", id, userId);
	        }
			
			return modelMapper.map(expense,  ExpenseDto.class);
		} catch (ExpenseNotFoundException e) {
			throw e;
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting expense", e);
		}
	}
	
	public ExpenseDto createExpense(ExpenseDto expenseDto, Integer userId) {
		try {
			Expense expense = modelMapper.map(expenseDto, Expense.class);
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new UserNotFoundException("User Id", userId));
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
	
	public ExpenseDto updateExpense(Integer id, ExpenseDto expenseDto, Integer userId) {
		try {
			Expense existingExpense = expenseRepository.findById(id)
					.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			
			if (!existingExpense.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Expense", id, userId);
	        }
			
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
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while updating expense", e);
		}
	}
	
	public void deleteExpense(Integer id, Integer userId) {
		try {
			Expense expense = expenseRepository.findById(id)
			.orElseThrow(() -> new ExpenseNotFoundException("Expense Id", id));
			
			if (!expense.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Expense", id, userId);
	        }
			
			expenseRepository.delete(expense);
		} catch (ExpenseNotFoundException e) {
			throw e;
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error while deleting expense", e);
		}
	}
}

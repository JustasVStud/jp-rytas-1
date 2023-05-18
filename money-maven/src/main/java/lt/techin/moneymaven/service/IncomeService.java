package lt.techin.moneymaven.service;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.IncomeDto;
import lt.techin.moneymaven.exception.IncomeNotFoundException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
import lt.techin.moneymaven.exception.UnauthorizedAccessException;
import lt.techin.moneymaven.exception.UserNotFoundException;
import lt.techin.moneymaven.model.Income;
import lt.techin.moneymaven.model.User;
import lt.techin.moneymaven.repository.IncomeRepository;
import lt.techin.moneymaven.repository.UserRepository;

@Service
public class IncomeService {
	
	@Autowired
	private IncomeRepository incomeRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Page<IncomeDto >getIncomes(
			Pageable pageable,
			Integer userId,
			LocalDateTime startDate,
			LocalDateTime endDate){
		try {
			Page<Income> incomes;
			incomes = incomeRepository.findIncomes(pageable, startDate, endDate, userId );
			
//---------- Pirminis kodas
//			Page<Income> incomes = incomeRepository.findAllByUser_userId(pageable, userId);
//			if (incomes.isEmpty()) {
//				throw new NoEntriesFoundException("incomes");
			
			
			if (incomes.isEmpty()) {
			throw new NoEntriesFoundException("incomes");
			}
			return incomes.map(income -> modelMapper.map(income, IncomeDto.class));
		} catch (NoEntriesFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Unexpected Error while getting incomes", e);
		}
		
	}
	
	public IncomeDto getIncomeById(Integer id, Integer userId) {
		try {			
			Income income = incomeRepository.findById(id)
					.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
			
			if (!income.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Income", id, userId);
	        }
			
			return modelMapper.map(income,  IncomeDto.class);
		} catch (IncomeNotFoundException e) {
			throw e;
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting income", e);
		}
	}
	
	public IncomeDto createIncome(IncomeDto incomeDto, Integer userId) {
		try {
			Income income = modelMapper.map(incomeDto, Income.class);
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new UserNotFoundException("User Id", userId));
			income.setUser(user);
			Income savedIncome = incomeRepository.save(income);
			return modelMapper.map(savedIncome, IncomeDto.class);
		} catch (UserNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while creating income", e);
		}
	}
	
	public IncomeDto updateIncome(Integer id, IncomeDto incomeDto, Integer userId) {
		try {
			Income existingIncome = incomeRepository.findById(id)
					.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
			
			if (!existingIncome.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Income", id, userId);
	        }
			
			modelMapper.map(incomeDto, existingIncome);
			Income savedIncome = incomeRepository.save(existingIncome);
			return modelMapper.map(savedIncome, IncomeDto.class);
		} catch (IncomeNotFoundException e) {
			throw e;
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while updating income", e);
		}
	}
	
	public void deleteIncome(Integer id, Integer userId) {
		try {
			Income income = incomeRepository.findById(id)
			.orElseThrow(() -> new IncomeNotFoundException("Income_id", id));
			
			if (!income.getUser().getUserId().equals(userId)) {
	            throw new UnauthorizedAccessException("Income", id, userId);
	        }
			
			incomeRepository.delete(income);
		} catch (IncomeNotFoundException e) {
			throw e;
		} catch (UnauthorizedAccessException e){
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while deleting income", e);
		}
	}
}

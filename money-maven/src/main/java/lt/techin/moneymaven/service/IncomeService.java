package lt.techin.moneymaven.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.IncomeDto;
import lt.techin.moneymaven.exception.IncomeNotFoundException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
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
	
	public Page<IncomeDto >getIncomes(Pageable pageable, Integer userId){
		try {
			Page<Income> incomes = incomeRepository.findAllByUser_userId(pageable, userId);
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
	
	public IncomeDto getIncomeById(Integer id) {
		try {			
			Income income = incomeRepository.findById(id)
					.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
			return modelMapper.map(income,  IncomeDto.class);
		} catch (IncomeNotFoundException e) {
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
	
	public IncomeDto updateIncome(Integer id, IncomeDto incomeDto) {
		try {
			Income existingIncome = incomeRepository.findById(id)
					.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
			modelMapper.map(incomeDto, existingIncome);
			Income savedIncome = incomeRepository.save(existingIncome);
			return modelMapper.map(savedIncome, IncomeDto.class);
		} catch (IncomeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while updating income", e);
		}
	}
	
	public void deleteIncome(Integer id) {
		try {
			Income income = incomeRepository.findById(id)
			.orElseThrow(() -> new IncomeNotFoundException("Income_id", id));
			incomeRepository.delete(income);
		} catch (IncomeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while deleting income", e);
		}
	}
}

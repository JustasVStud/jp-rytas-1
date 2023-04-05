package lt.techin.moneymaven.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.IncomeDto;
import lt.techin.moneymaven.exception.IncomeNotFoundException;
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
	
	public List<IncomeDto >getAllIncomes() {
		List<Income> incomes = incomeRepository.findAll();
		return incomes.stream()
				.map(income -> modelMapper.map(income, IncomeDto.class))
				.collect(Collectors.toList());
	}
	
	public IncomeDto getIncomeById(Integer id) {
		Income income = incomeRepository.findById(id)
				.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
		return modelMapper.map(income,  IncomeDto.class);
	}
	
	public IncomeDto createIncome(IncomeDto incomeDto) {
		Income income = modelMapper.map(incomeDto, Income.class);
		User user = userRepository.findById(1)
				.orElseThrow(() -> new UserNotFoundException("User Id", 1));
		income.setUser(user);
		Income savedIncome = incomeRepository.save(income);
		return modelMapper.map(savedIncome, IncomeDto.class);
	}
	
	public IncomeDto updateIncome(Integer id, IncomeDto incomeDto) {
		Income existingIncome = incomeRepository.findById(id)
				.orElseThrow(() -> new IncomeNotFoundException("Income Id", id));
		modelMapper.map(incomeDto, existingIncome);
		
		
		Income savedIncome = incomeRepository.save(existingIncome);
		return modelMapper.map(savedIncome, IncomeDto.class);
	}
	
	public void deleteIncome(Integer id) {
		Income income = incomeRepository.findById(id)
		.orElseThrow(() -> new IncomeNotFoundException("Income_id", id));
		incomeRepository.delete(income);
	}
}

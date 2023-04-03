package lt.techin.moneymaven.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.IncomeDto;
import lt.techin.moneymaven.exception.IncomeNotFoundException;
import lt.techin.moneymaven.model.Income;
import lt.techin.moneymaven.repository.IncomeRepository;

@Service
public class IncomeService {
	
	@Autowired
	private IncomeRepository incomeRepository;
	
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
	
	public IncomeDto updateIncome(Integer id, IncomeDto incomeDto) {
		Income existingIncome = incomeRepository.findById(id)
				.orElseThrow(() -> new IncomeNotFoundException("Income_Id", id));
		modelMapper.map(incomeDto, existingIncome);
		
		
		Income savedIncome = incomeRepository.save(existingIncome);
		return modelMapper.map(savedIncome, IncomeDto.class);
	}
}

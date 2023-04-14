package lt.techin.moneymaven.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.moneymaven.dto.ExpenseTypeDto;
import lt.techin.moneymaven.exception.DuplicateExpenseTypeException;
import lt.techin.moneymaven.exception.ExpenseTypeNotFoundException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
import lt.techin.moneymaven.model.ExpenseType;
import lt.techin.moneymaven.repository.ExpenseTypeRepository;

@Service
public class ExpenseTypeService {
	
	@Autowired
	private ExpenseTypeRepository expenseTypeRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<ExpenseTypeDto> getAllExpenseTypes() {
		try {
			List<ExpenseType> expenseTypes = expenseTypeRepository.findAll();
			
			if (expenseTypes.isEmpty()) {
				throw new NoEntriesFoundException("expense types");
			}
			
			return expenseTypes.stream()
					.map(expenseType -> modelMapper.map(expenseType, ExpenseTypeDto.class))
					.collect(Collectors.toList());
			
		} catch (NoEntriesFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Unexpected Error while getting expense types", e);
		}
	}
	
	public ExpenseTypeDto getExpenseTypeById(Integer id) {
		try {
			ExpenseType expenseType = expenseTypeRepository.findById(id)
					.orElseThrow(() -> new ExpenseTypeNotFoundException("Expense type id", id));
			return modelMapper.map(expenseType, ExpenseTypeDto.class);
			
		} catch (ExpenseTypeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting expense type", e);
		}
	}
	
	public ExpenseTypeDto getExpenseTypeByName(String typeName) {
		try {
			
			ExpenseType expenseType = expenseTypeRepository.findByTypeName(typeName)
					.orElseThrow(() -> new ExpenseTypeNotFoundException("Expense type name", typeName));
			
			return modelMapper.map(expenseType, ExpenseTypeDto.class);
			
		} catch (ExpenseTypeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while getting expense type", e);
		}
	}
	
	public ExpenseTypeDto createExpenseType(ExpenseTypeDto expenseTypeDto) {
		try {
			
			expenseTypeRepository.findByTypeName(expenseTypeDto.getTypeName()).
			ifPresent(name -> {throw new DuplicateExpenseTypeException(name.getTypeName());});
			
			ExpenseType expenseType = modelMapper.map(expenseTypeDto, ExpenseType.class);
			expenseTypeRepository.save(expenseType);
			return modelMapper.map(expenseType, ExpenseTypeDto.class);
			
		} catch (DuplicateExpenseTypeException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while creating expense type", e);
		}		
	}
	
	public ExpenseTypeDto updateExpenseType(Integer id, ExpenseTypeDto expenseTypeDto) {
		try {
			ExpenseType existingExpenseType = expenseTypeRepository.findById(id)
					.orElseThrow(() -> new ExpenseTypeNotFoundException("Expense type Id", id));
			modelMapper.map(expenseTypeDto, existingExpenseType);
			ExpenseType savedExpenseType = expenseTypeRepository.save(existingExpenseType);
			return modelMapper.map(savedExpenseType, ExpenseTypeDto.class);
		} catch (ExpenseTypeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while updating expense type", e);
		}
	}
	
	public void deleteExpenseType(Integer id) {
		try {
			ExpenseType expenseType = expenseTypeRepository.findById(id)
					.orElseThrow(() -> new ExpenseTypeNotFoundException("Expense type Id", id));
			expenseTypeRepository.delete(expenseType);
		} catch (ExpenseTypeNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw new RuntimeException("Error while deleting expense type", e);
		}
	}
}

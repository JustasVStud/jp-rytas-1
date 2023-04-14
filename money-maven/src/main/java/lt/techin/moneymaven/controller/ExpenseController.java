package lt.techin.moneymaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.moneymaven.dto.ExpenseDto;
import lt.techin.moneymaven.service.ExpenseService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/expenses")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;
	
	@GetMapping
	public ResponseEntity<List<ExpenseDto>> getAllExpenses(){
		return new ResponseEntity<>(expenseService.getAllExpenses(), HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<ExpenseDto> getExpenseById(@PathVariable Integer id){
		return new ResponseEntity<>(expenseService.getExpenseById(id), HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<ExpenseDto> createExpense(@RequestBody ExpenseDto expenseDto){
		return new ResponseEntity<>(expenseService.createExpense(expenseDto), HttpStatus.OK);
	}
	@PatchMapping("/{id}")
	public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Integer id, @RequestBody ExpenseDto expenseDto){
		return new ResponseEntity<>(expenseService.updateExpense(id, expenseDto), HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteExpense(@PathVariable Integer id){
		expenseService.deleteExpense(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

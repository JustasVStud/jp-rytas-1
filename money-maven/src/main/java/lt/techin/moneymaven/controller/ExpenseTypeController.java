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

import lt.techin.moneymaven.dto.ExpenseTypeDto;
import lt.techin.moneymaven.service.ExpenseTypeService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/expenseTypes")
public class ExpenseTypeController {

	@Autowired
	private ExpenseTypeService expenseTypeService;
	
	@GetMapping
	public ResponseEntity<List<ExpenseTypeDto>> getAllExpenseTypes(){
		return new ResponseEntity<>(expenseTypeService.getAllExpenseTypes(), HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<ExpenseTypeDto> getExpenseTypeById(@PathVariable Integer id){
		return new ResponseEntity<>(expenseTypeService.getExpenseTypeById(id), HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<ExpenseTypeDto> createExpenseType(@RequestBody ExpenseTypeDto expenseTypeDto){
		return new ResponseEntity<>(expenseTypeService.createExpenseType(expenseTypeDto), HttpStatus.OK);
	}
	@PatchMapping("/{id}")
	public ResponseEntity<ExpenseTypeDto> updateExpenseType(@PathVariable Integer id, @RequestBody ExpenseTypeDto expenseTypeDto){
		return new ResponseEntity<>(expenseTypeService.updateExpenseType(id, expenseTypeDto), HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteExpenseType(@PathVariable Integer id){
		expenseTypeService.deleteExpenseType(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

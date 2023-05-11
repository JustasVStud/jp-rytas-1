package lt.techin.moneymaven.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.moneymaven.dto.ExpenseDto;
import lt.techin.moneymaven.security.services.UserDetailsImpl;
import lt.techin.moneymaven.service.ExpenseService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/expenses")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;
	
	@GetMapping
	public ResponseEntity<Page<ExpenseDto>> getExpensesPage(
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "DESC") Sort.Direction direction,
			@RequestParam(required = false) String expenseTypeName,
			@RequestParam(required = false) LocalDateTime startDate,
			@RequestParam(required = false) LocalDateTime endDate,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	    Integer userId = userDetails.getUserId();
		Pageable pageable = PageRequest.of(page, pageSize, Sort.by(direction, "expenseDatetime"));
			return new ResponseEntity<>(expenseService.getExpensesPage(pageable, expenseTypeName, startDate, endDate, userId), HttpStatus.OK);		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ExpenseDto> getExpenseById(
			@PathVariable Integer id,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	    Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(expenseService.getExpenseById(id, userId), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<ExpenseDto> createExpense(
			@RequestBody ExpenseDto expenseDto,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	    Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(expenseService.createExpense(expenseDto, userId), HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<ExpenseDto> updateExpense(
			@PathVariable Integer id, 
			@RequestBody ExpenseDto expenseDto,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	    Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(expenseService.updateExpense(id, expenseDto, userId) , HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteExpense(
			@PathVariable Integer id,
			@AuthenticationPrincipal UserDetailsImpl userDetails){
	    if (userDetails == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	    Integer userId = userDetails.getUserId();
		expenseService.deleteExpense(id, userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

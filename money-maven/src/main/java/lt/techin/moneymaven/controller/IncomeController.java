package lt.techin.moneymaven.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

import lt.techin.moneymaven.dto.IncomeDto;
import lt.techin.moneymaven.security.services.UserDetailsImpl;
import lt.techin.moneymaven.service.IncomeService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/incomes")
public class IncomeController {
	
	@Autowired	
	private IncomeService incomeService;
	
	
	
	@GetMapping
	public ResponseEntity<Page<IncomeDto>> getIncomes(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "DESC") Sort.Direction direction,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		Pageable pageable = PageRequest.of(page, pageSize, Sort.by(direction, "incomeDatetime"));
		
		return new ResponseEntity<>(incomeService.getIncomes(pageable, userId), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<IncomeDto> getIncomeById(
			@PathVariable Integer id,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(incomeService.getIncomeById(id, userId), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<IncomeDto> createIncome(
			@RequestBody IncomeDto incomeDto, 
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(incomeService.createIncome(incomeDto, userId), HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<IncomeDto> updateIncome(
			@PathVariable Integer id, 
			@RequestBody IncomeDto incomeDto, 
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(incomeService.updateIncome(id, incomeDto, userId), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteIncome(
			@PathVariable Integer id, 
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		incomeService.deleteIncome(id, userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}

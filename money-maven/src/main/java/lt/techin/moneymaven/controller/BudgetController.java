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

import lt.techin.moneymaven.dto.BudgetDto;
import lt.techin.moneymaven.security.services.UserDetailsImpl;
import lt.techin.moneymaven.service.BudgetService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/budgets")
public class BudgetController {

	@Autowired
	BudgetService budgetService;
	
	@GetMapping
	public ResponseEntity<Page<BudgetDto>> getBudgetsPage(
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue = "10") int pageSize,
			@RequestParam(defaultValue = "DESC") Sort.Direction direction,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    Integer userId = userDetails.getUserId();
	    Pageable pageable = PageRequest.of(page, pageSize, Sort.by(direction, "budgetMonth"));
	    return new ResponseEntity<>(budgetService.getBudgetsPage(pageable, userId), HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<BudgetDto> getBudgetById(
			@PathVariable Integer id,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(budgetService.getBudgetById(id, userId), HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<BudgetDto> createBudget(
			@RequestBody BudgetDto budgetDto,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(budgetService.createBudget(budgetDto, userId), HttpStatus.OK);
	}
	@PatchMapping("/{id}")
	public ResponseEntity<BudgetDto> updateBudget(
			@PathVariable Integer id,
			@RequestBody BudgetDto budgetDto,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		return new ResponseEntity<>(budgetService.updateBudget(id, budgetDto, userId), HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteBudget(
			@PathVariable Integer id,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
		Integer userId = userDetails.getUserId();
		budgetService.deleteBudget(id, userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}

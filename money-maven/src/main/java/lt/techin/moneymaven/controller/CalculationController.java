package lt.techin.moneymaven.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.moneymaven.security.services.UserDetailsImpl;
import lt.techin.moneymaven.service.CalculationService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/calculations")
public class CalculationController {
	
	@Autowired
	CalculationService calculationService;
	
	@GetMapping("/expense")
	public ResponseEntity<BigDecimal> getTotalExpense(
			@RequestParam(required = false) String expenseTypeName,
			@RequestParam(required = false) LocalDateTime startDate,
			@RequestParam(required = false) LocalDateTime endDate,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    Integer userId = userDetails.getUserId();
		
		return new ResponseEntity<>(calculationService.getTotalExpense(userId, startDate, endDate, expenseTypeName), HttpStatus.OK);		
	}
	
	@GetMapping("/income")
	public ResponseEntity<BigDecimal> getTotalIncome(
			@RequestParam(required = false) LocalDateTime startDate,
			@RequestParam(required = false) LocalDateTime endDate,
			@AuthenticationPrincipal UserDetailsImpl userDetails
			){
	    Integer userId = userDetails.getUserId();
		
		return new ResponseEntity<>(calculationService.getTotalIncome(userId, startDate, endDate), HttpStatus.OK);		
	}
}

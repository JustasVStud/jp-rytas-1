package lt.techin.moneymaven.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.moneymaven.repository.IncomeRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/incomes")
public class IncomeController {
	
	@Autowired	
	IncomeRepository incomeRepository;
	
	
}

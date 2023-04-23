package lt.techin.moneymaven.controller;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lt.techin.moneymaven.exception.DuplicateExpenseTypeException;
import lt.techin.moneymaven.exception.ExpenseNotFoundException;
import lt.techin.moneymaven.exception.ExpenseTypeDeletionException;
import lt.techin.moneymaven.exception.ExpenseTypeNotFoundException;
import lt.techin.moneymaven.exception.IncomeNotFoundException;
import lt.techin.moneymaven.exception.NoEntriesFoundException;
import lt.techin.moneymaven.exception.UserNotFoundException;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
	
	
	@ExceptionHandler(NoEntriesFoundException.class)
	public ResponseEntity<Object> handleNotEntriesFoundException(
			NoEntriesFoundException ex, WebRequest request){
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", ex.getMessage());
		body.put("cause", ex.getCause());
		
		return new ResponseEntity<>(body, HttpStatus.NO_CONTENT);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleDefaultException(Exception ex, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("message", ex.getMessage());
		body.put("cause", ex.getCause());
		
		return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
    @ExceptionHandler(IncomeNotFoundException.class)
    public ResponseEntity<Object> handleIncomencomeNotFoundException(
    		IncomeNotFoundException ex, WebRequest request) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());
        body.put("cause", ex.getCause());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(
    		UserNotFoundException ex, WebRequest request) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());
        body.put("cause", ex.getCause());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ExpenseNotFoundException.class)
    public ResponseEntity<Object> handleExpenseNotFoundException(
    		ExpenseNotFoundException ex, WebRequest request) {
    	Map<String, Object> body = new LinkedHashMap<>();
    	body.put("timestamp", LocalDateTime.now());
    	body.put("message", ex.getMessage());
    	body.put("cause", ex.getCause());
    
    	return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ExpenseTypeNotFoundException.class)
    public ResponseEntity<Object> handleExpenseTypeNotFoundException(
    		ExpenseNotFoundException ex, WebRequest request) {
    	Map<String, Object> body = new LinkedHashMap<>();
    	body.put("timestamp", LocalDateTime.now());
    	body.put("message", ex.getMessage());
    	body.put("cause", ex.getCause());
    
    	return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(DuplicateExpenseTypeException.class)
    public ResponseEntity<Object> handleDuplicateExpenseTypeException(
    		DuplicateExpenseTypeException ex, WebRequest request) {
    	Map<String, Object> body = new LinkedHashMap<>();
    	body.put("timestamp", LocalDateTime.now());
    	body.put("message", ex.getMessage());
    	body.put("cause", ex.getCause());
    
    	return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
    }
    
    @ExceptionHandler(ExpenseTypeDeletionException.class)
    public ResponseEntity<Object> handleExpenseTypeDeletionException(
    		ExpenseTypeDeletionException ex, WebRequest request) {
    	Map<String, Object> body = new LinkedHashMap<>();
    	body.put("timestamp", LocalDateTime.now());
    	body.put("message", ex.getMessage());
    	body.put("cause", ex.getCause());
    
    	return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }
}

package lt.techin.moneymaven.exception;

public class ExpenseNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ExpenseNotFoundException(String fieldName, Object fieldValue) {
		super(String.format("Expense with %s : %s was not found", fieldName, fieldValue));
	}

}
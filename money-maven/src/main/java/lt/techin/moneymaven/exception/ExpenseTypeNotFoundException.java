package lt.techin.moneymaven.exception;

public class ExpenseTypeNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ExpenseTypeNotFoundException(String fieldName, Object fieldValue) {
		super(String.format("Expense type with %s : %s was not found", fieldName, fieldValue));
	}

}
package lt.techin.moneymaven.exception;

public class ExpenseTypeDeletionException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public ExpenseTypeDeletionException(String fieldName, Object fieldValue) {
		super(String.format("Expense with %s : %s could not be deleted due to foreign key constraints", fieldName, fieldValue));
	}
}

package lt.techin.moneymaven.exception;

public class BudgetNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public BudgetNotFoundException(String fieldName, Object fieldValue) {
		super(String.format("Budget with %s : %s was not found", fieldName, fieldValue));
	}

}

package lt.techin.moneymaven.exception;

public class DuplicateExpenseTypeException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public DuplicateExpenseTypeException(String typeName) {
		super(String.format("Expense type with name %s already exists", typeName));
	}

}
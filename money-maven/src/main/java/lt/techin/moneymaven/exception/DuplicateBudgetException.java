package lt.techin.moneymaven.exception;

public class DuplicateBudgetException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public DuplicateBudgetException(String typeName) {
		super(String.format("Budget with expense type %s already exists", typeName));
	}

}

package lt.techin.moneymaven.exception;

public class IncomeNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public IncomeNotFoundException(String fieldName, Object fieldValue) {
		super(String.format("Income with %s : %s was not found", fieldName, fieldValue));
	}

}

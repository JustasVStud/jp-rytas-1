package lt.techin.moneymaven.exception;

public class UnauthorizedAccessException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	public UnauthorizedAccessException(String fieldName, Object fieldValue, Object userId) {
		super(String.format("User with id: %s is not authorized to \"%s\" with id: %s", userId, fieldName, fieldValue));
	}
}

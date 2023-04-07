package lt.techin.moneymaven.exception;

public class UserNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String fieldName, Object fieldValue) {
		super(String.format("User with %s : %s was not found", fieldName, fieldValue));
	}

}
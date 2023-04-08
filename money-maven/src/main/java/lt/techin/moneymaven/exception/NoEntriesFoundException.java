package lt.techin.moneymaven.exception;

public class NoEntriesFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public NoEntriesFoundException(String tableName) {
		super(String.format("No entries were found in table: %s", tableName));
	}
}

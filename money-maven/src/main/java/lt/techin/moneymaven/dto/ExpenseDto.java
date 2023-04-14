package lt.techin.moneymaven.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

public class ExpenseDto {
	
	private Integer expenseId;
	private BigDecimal expenseAmount;
	private String expenseDescription;
	private String expenseTypeName;
	private LocalDateTime expenseDatetime;
	public Integer getExpenseId() {
		return expenseId;
	}
	public void setExpenseId(Integer expenseId) {
		this.expenseId = expenseId;
	}
	public BigDecimal getExpenseAmount() {
		return expenseAmount;
	}
	public void setExpenseAmount(BigDecimal expenseAmount) {
		this.expenseAmount = expenseAmount;
	}
	public String getExpenseDescription() {
		return expenseDescription;
	}
	public void setExpenseDescription(String expenseDescription) {
		this.expenseDescription = expenseDescription;
	}
	public String getExpenseTypeName() {
		return expenseTypeName;
	}
	public void setExpenseTypeName(String expenseTypeName) {
		this.expenseTypeName = expenseTypeName;
	}
	public LocalDateTime getExpenseDatetime() {
		return expenseDatetime;
	}
	public void setExpenseDatetime(LocalDateTime expenseDatetime) {
		this.expenseDatetime = expenseDatetime;
	}
	@Override
	public int hashCode() {
		return Objects.hash(expenseAmount, expenseDatetime, expenseDescription, expenseId, expenseTypeName);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExpenseDto other = (ExpenseDto) obj;
		return Objects.equals(expenseAmount, other.expenseAmount)
				&& Objects.equals(expenseDatetime, other.expenseDatetime)
				&& Objects.equals(expenseDescription, other.expenseDescription)
				&& Objects.equals(expenseId, other.expenseId) && Objects.equals(expenseTypeName, other.expenseTypeName);
	}
	@Override
	public String toString() {
		return "ExpenseDto [expenseId=" + expenseId + ", expenseAmount=" + expenseAmount + ", expenseDescription="
				+ expenseDescription + ", expenseTypeName=" + expenseTypeName + ", expenseDatetime=" + expenseDatetime
				+ "]";
	}
	
	
	
	
	
}

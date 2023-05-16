package lt.techin.moneymaven.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import org.springframework.format.annotation.DateTimeFormat;

public class BudgetDto {
	private Integer budgetId;
	private String expenseTypeName;
	private BigDecimal budgetAmount;
	@DateTimeFormat(pattern = "yyyy-MM")
	private LocalDate budgetMonth;
	
	public Integer getBudgetId() {
		return budgetId;
	}
	public void setBudgetId(Integer budgetId) {
		this.budgetId = budgetId;
	}
	public String getExpenseTypeName() {
		return expenseTypeName;
	}
	public void setExpenseTypeName(String expenseTypeName) {
		this.expenseTypeName = expenseTypeName;
	}
	public BigDecimal getBudgetAmount() {
		return budgetAmount;
	}
	public void setBudgetAmount(BigDecimal budgetAmount) {
		this.budgetAmount = budgetAmount;
	}
	public LocalDate getBudgetMonth() {
		return budgetMonth;
	}
	public void setBudgetMonth(LocalDate budgetMonth) {
		this.budgetMonth = budgetMonth;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(budgetAmount, budgetId, budgetMonth, expenseTypeName);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BudgetDto other = (BudgetDto) obj;
		return Objects.equals(budgetAmount, other.budgetAmount) && Objects.equals(budgetId, other.budgetId)
				&& Objects.equals(budgetMonth, other.budgetMonth)
				&& Objects.equals(expenseTypeName, other.expenseTypeName);
	}
	
	@Override
	public String toString() {
		return "BudgetDto [budgetId=" + budgetId + ", expenseTypeName=" + expenseTypeName + ", budgetAmount="
				+ budgetAmount + ", budgetMonth=" + budgetMonth + "]";
	}
	
	
}

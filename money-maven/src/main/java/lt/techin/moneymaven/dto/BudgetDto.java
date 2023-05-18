package lt.techin.moneymaven.dto;

import java.math.BigDecimal;
import java.util.Objects;


public class BudgetDto {
	private Integer budgetId;
	private String expenseTypeName;
	private BigDecimal budgetAmount;
	
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

	
	@Override
	public int hashCode() {
		return Objects.hash(budgetAmount, budgetId, expenseTypeName);
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
				&& Objects.equals(expenseTypeName, other.expenseTypeName);
	}
	
	@Override
	public String toString() {
		return "BudgetDto [budgetId=" + budgetId + ", expenseTypeName=" + expenseTypeName + ", budgetAmount="
				+ budgetAmount + "]";
	}
	
	
}

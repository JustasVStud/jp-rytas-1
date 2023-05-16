package lt.techin.moneymaven.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "budgets")
public class Budget {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer budgetId;
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private User user;
	@JoinColumn(name = "expense_type_id", nullable = false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private ExpenseType expenseType;
	@Column(name = "budget_amount", nullable = false)
	private BigDecimal budgetAmount;
	@Column(name = "budget_month", nullable = false)
	private LocalDate budgetMonth;
	
	public Budget() {
		super();
	}
	
	public Budget(Integer budgetId, User user, ExpenseType expenseType, BigDecimal budgetAmount,
			LocalDate budgetMonth) {
		super();
		this.budgetId = budgetId;
		this.user = user;
		this.expenseType = expenseType;
		this.budgetAmount = budgetAmount;
		this.budgetMonth = budgetMonth;
	}
	
	public Integer getBudgetId() {
		return budgetId;
	}
	public void setBudgetId(Integer budgetId) {
		this.budgetId = budgetId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public ExpenseType getExpenseType() {
		return expenseType;
	}
	public void setExpenseType(ExpenseType expenseType) {
		this.expenseType = expenseType;
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
		return Objects.hash(budgetAmount, budgetId, budgetMonth, expenseType, user);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Budget other = (Budget) obj;
		return Objects.equals(budgetAmount, other.budgetAmount) && Objects.equals(budgetId, other.budgetId)
				&& Objects.equals(budgetMonth, other.budgetMonth) && Objects.equals(expenseType, other.expenseType)
				&& Objects.equals(user, other.user);
	}
	
	@Override
	public String toString() {
		return "Budget [budgetId=" + budgetId + ", user=" + user + ", expenseType=" + expenseType + ", budgetAmount="
				+ budgetAmount + ", budgetMonth=" + budgetMonth + "]";
	}
	
	

}

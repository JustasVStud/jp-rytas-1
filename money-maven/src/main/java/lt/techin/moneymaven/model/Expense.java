package lt.techin.moneymaven.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
@Table(name = "expenses")
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer expenseId;
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private User user;
	@Column(name = "expense_amount", nullable = false)
	private BigDecimal expenseAmount;
	@Column(name = "expense_description")
	private String expenseDescription;
	@JoinColumn(name = "expense_type_id", nullable = false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private ExpenseType expenseType;
	@Column(name = "expense_datetime", nullable = false)
	private LocalDateTime expenseDatetime;
	
	public Expense() {
		super();
	}

	public Expense(Integer expenseId, User user, BigDecimal expenseAmount, String expenseDescription,
			ExpenseType expenseType, LocalDateTime expenseDatetime) {
		super();
		this.expenseId = expenseId;
		this.user = user;
		this.expenseAmount = expenseAmount;
		this.expenseDescription = expenseDescription;
		this.expenseType = expenseType;
		this.expenseDatetime = expenseDatetime;
	}

	public Integer getExpenseId() {
		return expenseId;
	}

	public void setExpenseId(Integer expenseId) {
		this.expenseId = expenseId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public ExpenseType getExpenseType() {
		return expenseType;
	}

	public void setExpenseType(ExpenseType expenseType) {
		this.expenseType = expenseType;
	}

	public LocalDateTime getExpenseDatetime() {
		return expenseDatetime;
	}

	public void setExpenseDatetime(LocalDateTime expenseDatetime) {
		this.expenseDatetime = expenseDatetime;
	}

	@Override
	public int hashCode() {
		return Objects.hash(expenseAmount, expenseDatetime, expenseDescription, expenseId, expenseType, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Expense other = (Expense) obj;
		return Objects.equals(expenseAmount, other.expenseAmount)
				&& Objects.equals(expenseDatetime, other.expenseDatetime)
				&& Objects.equals(expenseDescription, other.expenseDescription)
				&& Objects.equals(expenseId, other.expenseId) && Objects.equals(expenseType, other.expenseType)
				&& Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		return "Expense [expenseId=" + expenseId + ", user=" + user + ", expenseAmount=" + expenseAmount
				+ ", expenseDescription=" + expenseDescription + ", expenseType=" + expenseType + ", expenseDatetime="
				+ expenseDatetime + "]";
	}
	
	
}
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
@Table(name = "incomes")
public class Income {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer incomeId;
	@JoinColumn (name = "user_id", nullable=false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private User user;
	@Column(name = "income_amount", nullable=false)
	private BigDecimal incomeAmount = BigDecimal.ZERO;
	@Column(name = "income_description")
	private String incomeDescription;
	@Column(name = "income_datetime")
	private LocalDateTime incomeDatetime;
	
	public Income() {
		super();
	}

	public Income(Integer incomeId, User user, BigDecimal incomeAmount, String incomeDescription,
			LocalDateTime incomeDatetime) {
		super();
		this.incomeId = incomeId;
		this.user = user;
		this.incomeAmount = incomeAmount;
		this.incomeDescription = incomeDescription;
		this.incomeDatetime = incomeDatetime;
	}

	public Integer getIncomeId() {
		return incomeId;
	}

	public void setIncomeId(Integer incomeId) {
		this.incomeId = incomeId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public BigDecimal getIncomeAmount() {
		return incomeAmount;
	}

	public void setIncomeAmount(BigDecimal incomeAmount) {
		this.incomeAmount = incomeAmount;
	}

	public String getIncomeDescription() {
		return incomeDescription;
	}

	public void setIncomeDescription(String incomeDescription) {
		this.incomeDescription = incomeDescription;
	}

	public LocalDateTime getIncomeDatetime() {
		return incomeDatetime;
	}

	public void setIncomeDatetime(LocalDateTime incomeDatetime) {
		this.incomeDatetime = incomeDatetime;
	}

	@Override
	public int hashCode() {
		return Objects.hash(incomeAmount, incomeDatetime, incomeDescription, incomeId, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Income other = (Income) obj;
		return Objects.equals(incomeAmount, other.incomeAmount) && Objects.equals(incomeDatetime, other.incomeDatetime)
				&& Objects.equals(incomeDescription, other.incomeDescription)
				&& Objects.equals(incomeId, other.incomeId) && Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		return "Income [incomeId=" + incomeId + ", user=" + user + ", incomeAmount=" + incomeAmount
				+ ", incomeDescription=" + incomeDescription + ", incomeDatetime=" + incomeDatetime + "]";
	}
	
	
}

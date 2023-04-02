package lt.techin.moneymaven.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import lt.techin.moneymaven.model.User;

public class IncomeDto {
	
	private User user;
	private BigDecimal incomeAmount;
	private String incomeDescription;
	private LocalDateTime incomeDatetime;
	
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
		return Objects.hash(incomeAmount, incomeDatetime, incomeDescription, user);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IncomeDto other = (IncomeDto) obj;
		return Objects.equals(incomeAmount, other.incomeAmount) && Objects.equals(incomeDatetime, other.incomeDatetime)
				&& Objects.equals(incomeDescription, other.incomeDescription) && Objects.equals(user, other.user);
	}
	
	@Override
	public String toString() {
		return "IncomeDto [user=" + user + ", incomeAmount=" + incomeAmount + ", incomeDescription=" + incomeDescription
				+ ", incomeDatetime=" + incomeDatetime + "]";
	}
}

package lt.techin.moneymaven.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;



public class IncomeDto {
	private Integer incomeId;
	private BigDecimal incomeAmount;
	private String incomeDescription;
	private LocalDateTime incomeDatetime;
	
	
	public Integer getIncomeId() {
		return incomeId;
	}
	public void setIncomeId(Integer incomeId) {
		this.incomeId = incomeId;
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
		return Objects.hash(incomeAmount, incomeDatetime, incomeDescription, incomeId);
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
				&& Objects.equals(incomeDescription, other.incomeDescription)
				&& Objects.equals(incomeId, other.incomeId);
	}
	@Override
	public String toString() {
		return "IncomeDto [incomeId=" + incomeId + ", incomeAmount=" + incomeAmount + ", incomeDescription="
				+ incomeDescription + ", incomeDatetime=" + incomeDatetime + "]";
	}
	
	
}

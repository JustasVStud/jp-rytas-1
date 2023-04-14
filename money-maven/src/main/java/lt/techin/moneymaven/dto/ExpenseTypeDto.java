package lt.techin.moneymaven.dto;

import java.util.Objects;

public class ExpenseTypeDto {
	
	private Integer typeId;
	private String typeName;
	
	public Integer getTypeId() {
		return typeId;
	}
	
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	
	public String getTypeName() {
		return typeName;
	}
	
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(typeId, typeName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExpenseTypeDto other = (ExpenseTypeDto) obj;
		return Objects.equals(typeId, other.typeId) && Objects.equals(typeName, other.typeName);
	}

	@Override
	public String toString() {
		return "ExpenseTypeDto [typeId=" + typeId + ", typeName=" + typeName + "]";
	}
	
	
}

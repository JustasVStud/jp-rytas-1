package lt.techin.moneymaven.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expense_types")
public class ExpenseType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer typeId;
	@Column(name = "type_name", nullable=false)
	private String typeName;
	
	
	public ExpenseType() {
		super();
	}
	public ExpenseType(Integer typeId, String typeName) {
		super();
		this.typeId = typeId;
		this.typeName = typeName;
	}
	
	
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
		ExpenseType other = (ExpenseType) obj;
		return Objects.equals(typeId, other.typeId) && Objects.equals(typeName, other.typeName);
	}
	
	
	@Override
	public String toString() {
		return "ExpenseType [typeId=" + typeId + ", typeName=" + typeName + "]";
	}
}

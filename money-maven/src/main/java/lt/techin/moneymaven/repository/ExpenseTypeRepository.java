package lt.techin.moneymaven.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.moneymaven.model.ExpenseType;

public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, Integer>{
	
	Optional<ExpenseType> findByTypeName(String typeName);

}

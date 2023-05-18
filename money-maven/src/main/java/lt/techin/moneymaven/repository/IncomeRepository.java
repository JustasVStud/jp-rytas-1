package lt.techin.moneymaven.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Expense;
import lt.techin.moneymaven.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Integer> {
	
//	Page<Income> findAllByUser_userId(Pageable pageable, Integer userId);

	
	@Query("SELECT e FROM Income e " +
	           "WHERE (:startDate IS NULL OR e.incomeDatetime >= :startDate) " +
	           "AND (:endDate IS NULL OR e.incomeDatetime <= :endDate) " +
	           "AND e.user.userId = :userId")
	    Page<Income> findIncomes(Pageable pageable,
	                               @Param("startDate") LocalDateTime startDate,
	                               @Param("endDate") LocalDateTime endDate,
	                               @Param("userId") Integer userId);
}

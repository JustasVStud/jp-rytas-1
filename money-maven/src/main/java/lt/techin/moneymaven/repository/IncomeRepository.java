package lt.techin.moneymaven.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lt.techin.moneymaven.model.Income;

public interface IncomeRepository extends JpaRepository<Income, Integer> {
	
//	Page<Income> findAllByUser_userId(Pageable pageable, Integer userId);

	
	@Query("SELECT i FROM Income i " +
	           "WHERE (:startDate IS NULL OR i.incomeDatetime >= :startDate) " +
	           "AND (:endDate IS NULL OR i.incomeDatetime <= :endDate) " +
	           "AND i.user.userId = :userId")
	    Page<Income> findIncomes(Pageable pageable,
	                               @Param("startDate") LocalDateTime startDate,
	                               @Param("endDate") LocalDateTime endDate,
	                               @Param("userId") Integer userId);
	
	
	@Query("SELECT SUM(i.incomeAmount) FROM Income i " +
	           "WHERE i.user.userId = :userId " +
	           "AND (:startDate IS NULL OR i.incomeDatetime >= :startDate) " +
	           "AND (:endDate IS NULL OR i.incomeDatetime <= :endDate)")
	    Optional<BigDecimal> getTotalIncome(@Param("userId") Integer userId,
	                              @Param("startDate") LocalDateTime startDate,
	                              @Param("endDate") LocalDateTime endDate);
}

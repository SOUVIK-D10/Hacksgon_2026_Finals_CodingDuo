package codingduo.hacksagon.ussp.api.Repo;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import codingduo.hacksagon.ussp.api.Model.Ticket;

import jakarta.transaction.Transactional;
@Repository
public interface TicketRepo extends JpaRepository<Ticket,Integer> {
    Page<Ticket> findByUserId(int userId,Pageable pageable);
    Optional<Ticket> findByUserIdAndTicketId(int userId,int ticketId);
    Page<Ticket> findByCategory(String category,Pageable pageable);
    @Transactional
    @Modifying
    @Query("DELETE FROM Ticket t WHERE t.ticketId = :ticketId AND t.userId = :userId AND t.status = 'SUBMITTED'")
    int deleteByTicketIdAndUserId(int ticketId, int userId);
    Page<Ticket> findAll(Pageable pageable);
}


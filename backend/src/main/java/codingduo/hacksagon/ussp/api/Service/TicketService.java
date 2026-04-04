package codingduo.hacksagon.ussp.api.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import codingduo.hacksagon.ussp.api.DTO.TicketDTO;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Ticket;
import codingduo.hacksagon.ussp.api.Repo.TicketRepo;
import codingduo.hacksagon.ussp.api.Standards.Category;
import codingduo.hacksagon.ussp.api.Standards.Status;
import codingduo.hacksagon.ussp.api.Standards.Time;

@Service
public class TicketService {
    private TicketRepo db;

    @Autowired
    public TicketService(TicketRepo db) {
        this.db = db;
    }

    public Ticket createTicket(TicketDTO dto, int userId) throws GeneralException {
        if (dto == null || dto.category() == null) {
        throw new GeneralException("400:Category is required");
    }
        if(!Category.GRIEVANCE_CATEGORIES.contains(dto.category())) throw new GeneralException("400:Invalid Category");
        Ticket ticket = new Ticket();
        ticket
                .setTitle(dto.title())
                .setCreatedAt(Time.now())
                .setUserId(userId)
                .setCategory(dto.category())
                .setContent(dto.content())
                .setStatus(Status.SUBMITTED);
        return db.save(ticket);
    }
    public Ticket solveTicket(int ticketId,String remark) throws GeneralException {
        Ticket ticket = db.findById(ticketId).orElseThrow(() -> new GeneralException("404:Ticket Not Found"));
        return db.save(ticket.setStatus(Status.SOLVED).setResolvedAt(Time.now()).setAdminRemark(remark));
    }
    public Ticket gotTicket(int ticketId) throws GeneralException {
        Ticket ticket = db.findById(ticketId).orElseThrow(() -> new GeneralException("404:Ticket Not Found"));
        return db.save(ticket.setStatus(Status.UNDER_REVIEW));
    }
    public void withdrawTicket(int ticketId, int userId) throws GeneralException {
        int deletedCount = db.deleteByTicketIdAndUserId(ticketId, userId);
        if (deletedCount == 0) throw new GeneralException("400:Ticket already under review or not found");
    }
    public Ticket getTicketById(int ticketId) throws GeneralException {
        return db.findById(ticketId).orElseThrow(() -> new GeneralException("404:Ticket Not Found"));
    }
    public Ticket getTicketById(int ticketId,int userId) throws GeneralException {
        return db.findByUserIdAndTicketId(userId,ticketId).orElseThrow(() -> new GeneralException("404:Ticket Not Found"));
    }
    public Page<Ticket> getAllTicketsByUser(int page, int size,Sort sort,int userId) {
        return db.findByUserId(userId,PageRequest.of(page, size,sort));
    }
    public Page<Ticket> getTicketsByCategory(String category,int page, int size,Sort sort) throws GeneralException {
        if(!Category.GRIEVANCE_CATEGORIES.contains(category)) throw new GeneralException("400:Invalid Category");
        return db.findByCategory(category,PageRequest.of(page, size,sort));
    }
    public Page<Ticket> getAllTickets(int page, int size,Sort sort) {
        return db.findAll(PageRequest.of(page, size,sort));
    }
}

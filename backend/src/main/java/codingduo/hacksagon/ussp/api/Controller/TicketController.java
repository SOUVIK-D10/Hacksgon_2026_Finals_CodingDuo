package codingduo.hacksagon.ussp.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codingduo.hacksagon.ussp.api.DTO.TicketDTO;
import codingduo.hacksagon.ussp.api.Exception.AuthorizationFailureException;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Ticket;
import codingduo.hacksagon.ussp.api.Model.UserData;
import codingduo.hacksagon.ussp.api.Service.TicketService;
import codingduo.hacksagon.ussp.api.Standards.Role;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("api/ticket")
public class TicketController {
    private TicketService service;

    @Autowired
    public TicketController(TicketService service) {
        this.service = service;
    
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Ticket>> getAll(
            @AuthenticationPrincipal UserData details,
            @RequestParam(value = "page", required = false, defaultValue = "0") @NotNull Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "10") @NotNull Integer size,
            @RequestParam(value = "sortby", required = false, defaultValue = "ticketId") @NotNull String sortby,
            @RequestParam(value = "dir", required = false, defaultValue = "desc") @NotNull String dir,
            @RequestParam(value = "category", required = false) String category) throws GeneralException {
        Sort sort = null;
        if (size > 100)
            size = 100;
        if (size < 1)
            size = 3;
        if (sortby.equalsIgnoreCase("userId"))
            sortby = "ticketId";
        if (dir.equalsIgnoreCase("desc"))
            sort = Sort.by(sortby).descending();
        else
            sort = Sort.by(sortby).ascending();
        if (details.getRole().equals(Role.ADMIN) && category != null)
            return new ResponseEntity<>(service.getTicketsByCategory(category, page, size, sort), HttpStatus.OK);
        if (details.getRole().equals(Role.ADMIN) && category == null)
            return new ResponseEntity<>(service.getAllTickets(page, size, sort), HttpStatus.OK);
        return new ResponseEntity<>(service.getAllTicketsByUser(page, size, sort, details.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<Ticket> getTicket(@AuthenticationPrincipal UserData details,
            @PathVariable int ticketId) throws GeneralException {
        if (details.getRole().equals(Role.ADMIN))
            return new ResponseEntity<>(service.getTicketById(ticketId), HttpStatus.OK);
        return new ResponseEntity<>(service.getTicketById(ticketId, details.getUserId()), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Ticket> newTicket(
            @AuthenticationPrincipal UserData details,
            @RequestBody TicketDTO dto) throws AuthorizationFailureException, GeneralException {
        if (!details.getRole().equals(Role.USER))
            throw new AuthorizationFailureException("Not Allowed");
        return new ResponseEntity<>(service.createTicket(dto, details.getUserId()), HttpStatus.CREATED);
    }

    @PatchMapping("/seen/{ticketId}")
    public ResponseEntity<Ticket> gotTicket(
            @AuthenticationPrincipal UserData details,
            @PathVariable int ticketId) throws AuthorizationFailureException, GeneralException {
        if (!details.getRole().equals(Role.ADMIN))
            throw new AuthorizationFailureException("Not Allowed");
        return new ResponseEntity<>(service.gotTicket(ticketId), HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/solved/{ticketId}")
    public ResponseEntity<Ticket> solveTicket(
            @AuthenticationPrincipal UserData details,
            @PathVariable int ticketId,
            @RequestBody(required = false) String remark) throws AuthorizationFailureException, GeneralException {
        if (!details.getRole().equals(Role.ADMIN))
            throw new AuthorizationFailureException("Not Allowed");
        return new ResponseEntity<>(service.solveTicket(ticketId, remark), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/withdraw/{ticketId}")
    public ResponseEntity<Ticket> withdraw(
            @AuthenticationPrincipal UserData details,
            @PathVariable int ticketId) throws AuthorizationFailureException, GeneralException {
        if (!details.getRole().equals(Role.USER))
            throw new AuthorizationFailureException("Not Allowed");
        service.withdrawTicket(ticketId, details.getUserId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

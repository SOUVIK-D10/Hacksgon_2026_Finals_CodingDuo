package codingduo.hacksagon.ussp.api.Controller;

import codingduo.hacksagon.ussp.api.Exception.AuthorizationFailureException;
import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Notice;
import codingduo.hacksagon.ussp.api.Model.UserData;
import codingduo.hacksagon.ussp.api.Service.NoticeService;
import codingduo.hacksagon.ussp.api.Standards.Role;
import jakarta.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {
    @Autowired
    private NoticeService service;

    @GetMapping("/all")
    public ResponseEntity<Page<Notice>> getAll(
            @RequestParam(value = "page", required = false, defaultValue = "0") @NotNull Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "3") @NotNull Integer size,
            @RequestParam(value = "sortby", required = false, defaultValue = "noteId") @NotNull String sortby,
            @RequestParam(value = "dir", required = false, defaultValue = "asc") @NotNull String dir,
            @RequestParam(value = "category", required = false,defaultValue ="") @NotNull  String category
    ) throws GeneralException {
        Sort sort = null;
        if (size > 10)
            size = 10;
        if (size < 1)
            size = 3;
        if (sortby.equalsIgnoreCase("userId"))
            sortby = "ticketId";
        if (dir.equalsIgnoreCase("desc"))
            sort = Sort.by(sortby).descending();
        else
            sort = Sort.by(sortby).ascending();
        if(category.isBlank() || category.isEmpty()) return new ResponseEntity<>(service.getAll(page,size,sort),HttpStatus.OK);
        else return new ResponseEntity<>(service.getAllByCategory(page,size,sort,category),HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Notice> create(@AuthenticationPrincipal UserData details,@RequestBody Notice resource) throws GeneralException, AuthorizationFailureException {
        if (!details.getRole().equals(Role.ADMIN))
            throw new AuthorizationFailureException("Not Allowed");
        return new ResponseEntity<>(service.save(resource),HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getOne(@PathVariable int id) throws GeneralException {
        return new ResponseEntity<>( service.getById(id),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> update(@AuthenticationPrincipal UserData details,@PathVariable int id, @RequestBody Notice resource) throws GeneralException, AuthorizationFailureException {
        if (!details.getRole().equals(Role.ADMIN))
            throw new AuthorizationFailureException("Not Allowed");
        return new ResponseEntity<>(service.update(id, resource),HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserData details,@PathVariable int id) throws AuthorizationFailureException {
        if (!details.getRole().equals(Role.ADMIN))
            throw new AuthorizationFailureException("Not Allowed");
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
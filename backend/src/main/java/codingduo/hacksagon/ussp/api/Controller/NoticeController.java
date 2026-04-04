package codingduo.hacksagon.ussp.api.Controller;

import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Notice;
import codingduo.hacksagon.ussp.api.Service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {
    @Autowired
    private NoticeService service;

    @GetMapping("/all")
    public ResponseEntity<List<Notice>> getAll() {
        return new ResponseEntity<>(service.getAll(),HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Notice> create(@RequestBody Notice resource) {
        return new ResponseEntity<>(service.save(resource),HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getOne(@PathVariable int id) {
        return new ResponseEntity<>( service.getById(id),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> update(@PathVariable int id, @RequestBody Notice resource) throws GeneralException {
        return new ResponseEntity<>(service.update(id, resource),HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
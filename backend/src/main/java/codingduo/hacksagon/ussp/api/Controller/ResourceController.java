package codingduo.hacksagon.ussp.api.Controller;

import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Resource;
import codingduo.hacksagon.ussp.api.Service.ResourceService;
import jakarta.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/resource")
public class ResourceController {
    @Autowired
    private ResourceService service;

    @GetMapping("/all")
    public ResponseEntity<Page<Resource>> getAll(
        @RequestParam(value = "page", required = false, defaultValue = "0") @NotNull Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "100") @NotNull Integer size,
            @RequestParam(value = "sortby", required = false, defaultValue = "resourceId") @NotNull String sortby,
            @RequestParam(value = "dir", required = false, defaultValue = "desc") @NotNull String dir,
            @RequestParam(value = "category", required = false,defaultValue ="") @NotNull  String category
    ) throws GeneralException {
        Sort sort = null;
        if (size > 200)
            size = 100;
        if (size < 1)
            size = 10;
        if (sortby.equalsIgnoreCase("userId"))
            sortby = "ticketId";
        if (dir.equalsIgnoreCase("desc"))
            sort = Sort.by(sortby).descending();
        else
            sort = Sort.by(sortby).ascending();
        if(category.isBlank() || category.isEmpty()) return new ResponseEntity<>(service.getAll(page,size,sort),HttpStatus.OK);
        return new ResponseEntity<>(service.getAllByCategory(page,size,sort,category),HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Resource> create(@RequestBody Resource resource) throws GeneralException {
        return new ResponseEntity<>(service.save(resource),HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getOne(@PathVariable int id) throws GeneralException {
        return new ResponseEntity<>( service.getById(id),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> update(@PathVariable int id, @RequestBody Resource resource) throws GeneralException {
        return new ResponseEntity<>(service.update(id, resource),HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
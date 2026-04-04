package codingduo.hacksagon.ussp.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import codingduo.hacksagon.ussp.api.DTO.TicketDTO;
import codingduo.hacksagon.ussp.api.Service.AIService;
@RestController
public class AIController {
    private AIService service;
    @Autowired
    public AIController(AIService service) {
        this.service = service;
    }
    @PostMapping("/api/ticket/categorize")
    public ResponseEntity<String> categorize(@RequestBody TicketDTO dto){
        return new ResponseEntity<>(service.askLlama("Title:"+dto.title()+" Description : "+dto.content()+" Assess the category as per given by system"),HttpStatus.OK);
    }
    // @PostMapping("/api/notice/categorize")
    // public ResponseEntity<String> categorize(@RequestBody Notice notice){
    //     return new ResponseEntity<>(service.askLlama("Title:"+dto.title()+" Description : "+dto.content()+" Assess the category as per given by system"),HttpStatus.OK);
    // }
    /*@PostMapping("/api/notice/auto-write")
    public ResponseEntity<NoteDTO> autoWrite(@RequestBody NoteDTO dto){
        
    }*/
}

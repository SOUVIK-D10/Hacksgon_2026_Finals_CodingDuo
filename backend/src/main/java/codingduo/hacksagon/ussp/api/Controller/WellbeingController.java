package codingduo.hacksagon.ussp.api.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codingduo.hacksagon.ussp.api.DTO.SlotResponse;
import codingduo.hacksagon.ussp.api.DTO.SosDTO;
import codingduo.hacksagon.ussp.api.Model.UserData;
import codingduo.hacksagon.ussp.api.Service.WellbeingService;

@RestController
public class WellbeingController {
    @Autowired
    private WellbeingService service;

    @PostMapping("/api/sos")
    public ResponseEntity<Void> sosAlart(
            @AuthenticationPrincipal UserData details,
            @RequestBody SosDTO dto) {
        service.sendAlart(details.getUserId(), dto.latitude(), dto.longitude());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/wellbeing/slots")
    public ResponseEntity<List<SlotResponse>> getSlots(
            @RequestParam int counselorId,
            @RequestParam LocalDate date) {
                return new ResponseEntity<>(service.getSlots(counselorId, date),HttpStatus.OK);
    }

    // @PostMapping("/api/wellbeing/appointment/book")

}

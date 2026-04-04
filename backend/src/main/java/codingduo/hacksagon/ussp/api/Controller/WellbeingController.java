package codingduo.hacksagon.ussp.api.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        @RequestBody SosDTO dto
    ){
        service.sendAlart(details.getUserId(),dto.latitude(),dto.longitude());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

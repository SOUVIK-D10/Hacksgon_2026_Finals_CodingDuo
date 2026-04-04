package codingduo.hacksagon.ussp.api.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WellbeingService {
    private EmailService service;
    @Autowired
    public WellbeingService(EmailService service){
        this.service=service;
    }
    public void sendAlart(int userId, String latitude, String longitude) {
        String googleMapsLink = "https://www.google.com/maps?q=" + latitude + "," + longitude;
        String emailBody = String.format("!!!EMERGENCY ALERT TRIGGERED!!!\n\nStudent having id : %d\nis currently at\nLOCATION : %s\n\nNEED help.",userId,googleMapsLink);
        service.sendMail("atherline01@gmail.com","URGENT SOS ALERT",emailBody);
    }
    
}

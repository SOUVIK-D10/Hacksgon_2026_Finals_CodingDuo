package codingduo.hacksagon.ussp.api.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender sender;

    public void sendMail(String target,String subject,String content){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(target);
        mail.setSubject(subject);
        mail.setText(content);
        sender.send(mail);
    }
}

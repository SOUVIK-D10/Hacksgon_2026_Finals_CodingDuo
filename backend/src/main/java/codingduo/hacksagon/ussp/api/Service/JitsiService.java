package codingduo.hacksagon.ussp.api.Service;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class JitsiService {

    public String createMeeting(String topic) {
        // 1. Clean the topic to make it URL-safe (replace spaces with hyphens)
        String cleanTopic = topic.replaceAll("[^a-zA-Z0-9]", "-");
        
        // 2. Generate a random 8-character string so people can't guess the room
        String randomId = UUID.randomUUID().toString().substring(0, 8);
        
        // 3. Return the Jitsi URL
        return "https://meet.jit.si/USSP-" + cleanTopic + "-" + randomId;
    }
}

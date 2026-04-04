package codingduo.hacksagon.ussp.api.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AIService {
    @Value("${groq.api.key}")
    private String groqApiKey;
    @Value("${groq.api.url}")
    private String url;

    public String askLlama(String userPrompt) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);
        String requestBody = """
                {
                "model": "llama-3.1-8b-instant",
                "messages": [
                    {
                    "role": "system",
                    "content": "You are an intelligent campus assistant for a student platform and your job is to categorize the grievance based on title and description. Keep your answer should be 1 word among this only. OPTIONS for Category(STRICTLY ENUM ONLY THIS) : ACADEMIC_ISSUES, FACILITY_MAINTENANCE, TECHNICAL_SUPPORT, HOSTEL_MANAGEMENT , OTHER be sure to return among them in the all capital-only as it is given to you."
                    },
                    {
                    "role": "user",
                    "content": "%s"
                    }
                ]
                }
                """
                .formatted(userPrompt.replace("\"", "\\\""));
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response.getBody());
            String cleanText = rootNode.path("choices").get(0).path("message").path("content").asText();

            return cleanText;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error connecting to Groq AI.";
        }
    }
}


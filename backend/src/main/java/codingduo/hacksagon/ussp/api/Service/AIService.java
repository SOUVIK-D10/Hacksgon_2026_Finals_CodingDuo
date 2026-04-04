package codingduo.hacksagon.ussp.api.Service;

import java.util.List;
import java.util.Map;

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
    // Add this method inside your existing AIService class
public String enhanceNotice(String draft) {
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(groqApiKey);

    try {
        // Build JSON safely using Maps to prevent newline/quote escaping errors
        Map<String, Object> requestBodyMap = Map.of(
            "model", "llama-3.1-8b-instant", // Matching the model from your React code
            "temperature", 0.7,
            "messages", List.of(
                Map.of(
                    "role", "system", 
                    "content", "You are a professional university administrator. Format the following rough draft into a clear, concise, and professional campus announcement. Use markdown formatting, bullet points, and headers if necessary. Output ONLY the final notice. Do not include introductory phrases like 'Here is the notice' the limit of words is 100 characters strictly and at max 5 lines."
                ),
                Map.of(
                    "role", "user", 
                    "content", draft
                )
            )
        );

        ObjectMapper mapper = new ObjectMapper();
        String requestBody = mapper.writeValueAsString(requestBodyMap);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        JsonNode rootNode = mapper.readTree(response.getBody());
        
        return rootNode.path("choices").get(0).path("message").path("content").asText();

    } catch (Exception e) {
        e.printStackTrace();
        return "Error connecting to Groq AI: " + e.getMessage();
    }
}
}


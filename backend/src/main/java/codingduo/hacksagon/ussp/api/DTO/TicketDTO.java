package codingduo.hacksagon.ussp.api.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public record TicketDTO(
    @JsonProperty("title")
    @NotBlank(message = "Title is required")
    String title,
    
    @JsonProperty("content")
    @NotBlank(message = "Content is required")
    String content,
    
    @JsonProperty("category")
    @NotBlank(message = "Category is required")
    String category
) {}
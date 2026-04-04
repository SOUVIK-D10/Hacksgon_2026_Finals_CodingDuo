package codingduo.hacksagon.ussp.api.DTO;

import java.time.LocalDate;

public record AppointmentResponseDTO (
    Long id,
    String counselorName,
    String specialty,
    LocalDate date,
    String time,
     String category,
    String status
    ){}

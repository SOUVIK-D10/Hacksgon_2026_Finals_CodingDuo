package codingduo.hacksagon.ussp.api.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "appointments", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"counselorId", "appointmentDate", "appointmentTime"})
       })
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long counselorId;

    @Column(nullable = false)
    private LocalDate appointmentDate;

    @Column(nullable = false)
    private String appointmentTime;

    private String category;
    
    private String notes;
    private int studentId;
    private String status;
    private String meetLink; // e.g., "CONFIRMED"

    // Default Constructor
    public Appointment() {}

    // Full Constructor
    public Appointment(Long counselorId, LocalDate appointmentDate, String appointmentTime, String category, String notes, String status) {
        this.counselorId = counselorId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.category = category;
        this.notes = notes;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCounselorId() { return counselorId; }
    public void setCounselorId(Long counselorId) { this.counselorId = counselorId; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(String appointmentTime) { this.appointmentTime = appointmentTime; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }
    public int getStudentId() {
        return studentId;
    }
    public String getMeetLink() {
        return meetLink;
    }
    public void setMeetLink(String meetLink) {
        this.meetLink = meetLink;
    }
}
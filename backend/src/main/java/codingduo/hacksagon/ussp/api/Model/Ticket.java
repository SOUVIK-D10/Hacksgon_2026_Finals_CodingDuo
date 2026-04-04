package codingduo.hacksagon.ussp.api.Model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ticketId;
    @JsonIgnore
    private int userId;
    private String title;
    private String content;
    private String category;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private String adminRemark;
    public Ticket() {
    }
    public int getTicketId() {
        return ticketId;
    }
    public Ticket setTicketId(int ticketId) {
        this.ticketId = ticketId;
        return this;
    }
    public String getTitle() {
        return title;
    }
    public Ticket setTitle(String title) {
        this.title = title;
        return this;
    }
    public String getCategory() {
        return category;
    }
    public Ticket setCategory(String category) {
        this.category = category;
        return this;
    }
    public String getStatus() {
        return status;
    }
    public Ticket setStatus(String status) {
        this.status = status;
        return this;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public Ticket setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }
    public Ticket setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
        return this;
    }
    public String getAdminRemark() {
        return adminRemark;
    }
    public Ticket setAdminRemark(String adminRemark) {
        this.adminRemark = adminRemark;
        return this;
    }
    public Ticket setContent(String content) {
        this.content = content;
        return this;
    }
    public Ticket setUserId(int userId) {
        this.userId = userId;
        return this;
    }
    public String getContent() {
        return content;
    }
    public int getUserId() {
        return userId;
    }
}

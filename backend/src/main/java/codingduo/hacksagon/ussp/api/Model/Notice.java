package codingduo.hacksagon.ussp.api.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
@Entity
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int noteId;
    private String title;
    @Lob
    private String content;
    private String category;
    private boolean urgent;
    private LocalDateTime createdAt;
    public void setCategory(String category) {
        this.category = category;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getCategory() {
        return category;
    }
    public String getContent() {
        return content;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public int getNoteId() {
        return noteId;
    }
    public String getTitle() {
        return title;
    }
    public void setUrgent(boolean urgent) {
        this.urgent = urgent;
    }
    public boolean isUrgent() {
        return urgent;
    }
}

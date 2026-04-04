package codingduo.hacksagon.ussp.api.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "resource")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int resourceId;
    private String title;
    private String category;
    private String format;
    private int fileSize;
    private String url;
    public Resource() {
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public String getCategory() {
        return category;
    }
    public String getFormat() {
        return format;
    }
    public int getResourceId() {
        return resourceId;
    }
    public String getTitle() {
        return title;
    }
    public String getUrl() {
        return url;
    }
    public int getFileSize() {
        return fileSize;
    }
    public void setFileSize(int fileSize) {
        this.fileSize = fileSize;
    }
}

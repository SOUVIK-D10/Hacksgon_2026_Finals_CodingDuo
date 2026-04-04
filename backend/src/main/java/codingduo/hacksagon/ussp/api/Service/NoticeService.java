package codingduo.hacksagon.ussp.api.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Notice;
import codingduo.hacksagon.ussp.api.Repo.NoticeRepo;

import java.util.List;

@Service
public class NoticeService {
    @Autowired
    private NoticeRepo repository;

    public List<Notice> getAll() { return repository.findAll(); }

    public Notice getById(int id) { return repository.findById(id).orElse(null); }

    public Notice save(Notice notice) { 
        return repository.save(notice);
     }

    public Notice update(int id, Notice details) throws GeneralException {
        Notice existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setTitle(details.getTitle());
            existing.setContent(details.getContent());
            existing.setCategory(details.getCategory());
            existing.setCreatedAt(details.getCreatedAt());
            return repository.save(existing);
        }
        throw new GeneralException("404:Not Found");
    }

    public void delete(int id) { repository.deleteById(id); }
}
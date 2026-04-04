package codingduo.hacksagon.ussp.api.Service;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;



import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Notice;
import codingduo.hacksagon.ussp.api.Repo.NoticeRepo;
import codingduo.hacksagon.ussp.api.Standards.Category;



@Service
public class NoticeService {
    @Autowired
    private NoticeRepo repository;

    public Page<Notice> getAll(int page,int size,Sort sort) {
        Pageable p = PageRequest.of(page, size, sort);
        return repository.findAll(p);
    }
    public Page<Notice> getAllByCategory(int page,int size,Sort sort,String category) throws GeneralException {
        if(!Category.NOTICE_CATEGORIES.contains(category)) throw new GeneralException("400:Invalid Category");
        Pageable p = PageRequest.of(page, size, sort);
        return repository.findAllByCategory(category,p);
    }
    public Notice getById(int id) throws GeneralException { return repository.findById(id).orElseThrow(() -> new GeneralException("404:No Such user found")); }

    public Notice save(Notice notice) throws GeneralException {
        if(notice == null || notice.getCategory() == null || !Category.NOTICE_CATEGORIES.contains(notice.getCategory())) throw new GeneralException("400:Invalid Category");
        Notice safeNotice = new Notice();
        safeNotice.setCategory(notice.getCategory());
        safeNotice.setContent(notice.getContent());
        safeNotice.setTitle(notice.getTitle());
        safeNotice.setCreatedAt(LocalDateTime.now());
        safeNotice.setUrgent(false);
        if(notice.isUrgent())
        safeNotice.setUrgent(true);
        return repository.save(safeNotice);
    }

    public Notice update(int id, Notice details) throws GeneralException {
        if(details == null || details.getCategory() == null || !Category.NOTICE_CATEGORIES.contains(details.getCategory())) throw new GeneralException("400:Invalid Category");
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
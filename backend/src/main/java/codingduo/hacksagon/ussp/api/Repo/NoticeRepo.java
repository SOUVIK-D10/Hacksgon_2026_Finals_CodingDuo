package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import codingduo.hacksagon.ussp.api.Model.Notice;

public interface NoticeRepo extends JpaRepository<Notice,Integer>{
    Page<Notice> findAll(Pageable pageable);
    Page<Notice> findAllByCategory(String category,Pageable pageable);
}

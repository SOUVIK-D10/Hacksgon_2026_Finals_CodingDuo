package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import codingduo.hacksagon.ussp.api.Model.Notice;

public interface NoticeRepo extends JpaRepository<Notice,Integer>{
    
}

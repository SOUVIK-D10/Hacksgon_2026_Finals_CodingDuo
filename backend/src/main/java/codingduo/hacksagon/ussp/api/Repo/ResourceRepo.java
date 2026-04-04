package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import codingduo.hacksagon.ussp.api.Model.Resource;

public interface ResourceRepo extends JpaRepository<Resource,Integer>{
    Page<Resource> findAll(Pageable pageable);
    Page<Resource> findAllByCategory(String category,Pageable pageable);
}

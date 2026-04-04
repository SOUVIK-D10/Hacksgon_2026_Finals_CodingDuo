package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import codingduo.hacksagon.ussp.api.Model.Resource;

public interface ResourceRepo extends JpaRepository<Resource,Integer>{
    
}

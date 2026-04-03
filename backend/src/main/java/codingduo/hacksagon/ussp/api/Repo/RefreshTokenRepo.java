package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codingduo.hacksagon.ussp.api.Model.RefreshToken;
@Repository
public interface RefreshTokenRepo extends JpaRepository<RefreshToken,Integer>{
    RefreshToken findByToken(String token);
}

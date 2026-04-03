package codingduo.hacksagon.ussp.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codingduo.hacksagon.ussp.api.Model.Users;
@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    Users findByEmail(String email);
}

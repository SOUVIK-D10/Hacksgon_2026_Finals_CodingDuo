package codingduo.hacksagon.ussp.api.Service;

import codingduo.hacksagon.ussp.api.Exception.GeneralException;
import codingduo.hacksagon.ussp.api.Model.Resource;
import codingduo.hacksagon.ussp.api.Repo.ResourceRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepo repository;

    public List<Resource> getAll() { return repository.findAll(); }
    
    public Resource getById(int id) { return repository.findById(id).orElse(null); }

    public Resource save(Resource resource) {
        return repository.save(resource);
    }
//8LAGFJWZUM2PKB637RD4CZSN
    public Resource update(int id, Resource details) throws GeneralException {
        Resource existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setTitle(details.getTitle());
            existing.setCategory(details.getCategory());
            existing.setFormat(details.getFormat());
            existing.setFileSize(details.getFileSize());
            existing.setUrl(details.getUrl());
            return repository.save(existing);
        }
        throw new GeneralException("404:Not Found");
    }

    public void delete(int id) { repository.deleteById(id);}
}
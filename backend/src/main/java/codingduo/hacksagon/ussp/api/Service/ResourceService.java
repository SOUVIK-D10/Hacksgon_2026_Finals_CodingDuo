package codingduo.hacksagon.ussp.api.Service;

import codingduo.hacksagon.ussp.api.Exception.GeneralException;

import codingduo.hacksagon.ussp.api.Model.Resource;
import codingduo.hacksagon.ussp.api.Repo.ResourceRepo;
import codingduo.hacksagon.ussp.api.Standards.Category;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepo repository;

    public Resource getById(int id) throws GeneralException {
        return repository.findById(id).orElseThrow(() -> new GeneralException("404:USER not found"));
    }

    public Resource save(Resource resource) throws GeneralException {
        if (resource == null || resource.getCategory() == null
                || !Category.RESOURCE_CATEGORIES.contains(resource.getCategory()))
            throw new GeneralException("400:Invalid Category");
        Resource safeResource = new Resource();
        safeResource.setTitle(resource.getTitle());
        safeResource.setCategory(resource.getCategory());
        safeResource.setFileSize(resource.getFileSize());
        safeResource.setFormat(resource.getFormat());
        safeResource.setUrl(resource.getUrl());
        return repository.save(safeResource);
    }

    public Resource update(int id, Resource details) throws GeneralException {
        if (details == null || details.getCategory() == null
                || !Category.RESOURCE_CATEGORIES.contains(details.getCategory())) {
            throw new GeneralException("400:Invalid Category");
        }
        Resource existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setTitle(details.getTitle());
            existing.setCategory(details.getCategory());
            existing.setFileSize(details.getFileSize());
            existing.setFormat(details.getFormat());
            existing.setUrl(details.getUrl());
            return repository.save(existing);
        }
        throw new GeneralException("404:Not Found");
    }

    public void delete(int id) {
        repository.deleteById(id);
    }

    public Page<Resource> getAllByCategory(Integer page, Integer size, Sort sort, String category)
            throws GeneralException {
        if (!Category.RESOURCE_CATEGORIES.contains(category))
            throw new GeneralException("400:Invalid Category");
        Pageable p = PageRequest.of(page, size, sort);
        return repository.findAllByCategory(category, p);
    }

    public Page<Resource> getAll(Integer page, Integer size, Sort sort) {
        Pageable p = PageRequest.of(page, size, sort);
        return repository.findAll(p);
    }
}
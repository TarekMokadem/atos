package com.atos.task.service;

import com.atos.task.model.*;
import com.atos.task.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ResponsableService {

    final ResponsableRepository responsableRepository;

    public ResponsableService(ResponsableRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    public List<Responsable> getAll() {
        return responsableRepository.findAll();
    }

    public Optional<Responsable> findById(Long id) {
        Optional<Responsable> res = responsableRepository.findById(id);
        return res;
    }

    public Responsable findByName(String name) {
        return responsableRepository.findByName(name);
    }
    public Responsable create(Responsable responsable) {
        return responsableRepository.save(responsable);
    }

    public void deleteById(Long id) {
        responsableRepository.deleteById(id);
    }


}

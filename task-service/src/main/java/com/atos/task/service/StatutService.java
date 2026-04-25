package com.atos.task.service;

import com.atos.task.model.*;
import com.atos.task.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class StatutService {

    final StatutRepository statutRepository;

    public StatutService(StatutRepository statutRepository) {
        this.statutRepository = statutRepository;
    }

    public List<Statut> getAll() {
        return statutRepository.findAll();
    }

    public Optional<Statut> findById(Long id) {
        Optional<Statut> res = statutRepository.findById(id);
        return res;
    }

    public Statut findByName(String name) {
        return statutRepository.findByName(name);
    }
    public Statut create(Statut statut) {
        return statutRepository.save(statut);
    }

    public void deleteById(Long id) {
        statutRepository.deleteById(id);
    }


}

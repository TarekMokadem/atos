package com.atos.task.service;

import com.atos.task.model.AccessPort;
import com.atos.task.repository.AccessPortRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccessPortService {

    final AccessPortRepository accessPortRepository;

    public AccessPortService(AccessPortRepository accessPortRepository){
        this.accessPortRepository = accessPortRepository;
    }

    public AccessPort create(AccessPort accessPort){
        return accessPortRepository.save(accessPort);
    }

    public Optional<AccessPort> get(Long id){
        return accessPortRepository.findById(id);
    }

    public void deleteById(Long id){
        accessPortRepository.deleteById(id);
    }

}

package com.atos.task.service;

import com.atos.task.model.FluxDestination;
import com.atos.task.repository.FluxDestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FluxDestinationService {

    final FluxDestinationRepository fluxDestinationRepository;

    public FluxDestinationService(FluxDestinationRepository fluxDestinationRepository){
        this.fluxDestinationRepository = fluxDestinationRepository;
    }

    public FluxDestination create(FluxDestination fluxDestination){
        return fluxDestinationRepository.save(fluxDestination);
    }

    public List<FluxDestination> getAll(){
        return fluxDestinationRepository.findAll();
    }



}

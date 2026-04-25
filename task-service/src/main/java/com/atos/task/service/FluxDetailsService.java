package com.atos.task.service;

import com.atos.task.model.FluxDestination;
import com.atos.task.model.FluxDetails;
import com.atos.task.model.FluxSource;
import com.atos.task.repository.FluxDestinationRepository;
import com.atos.task.repository.FluxDetailsRepository;
import com.atos.task.repository.FluxSourceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FluxDetailsService {
    final FluxDetailsRepository fluxDetailsRepository;
    final FluxDestinationRepository fluxDestinationRepository;
    final FluxSourceRepository fluxSourceRepository;

    public FluxDetailsService(FluxDetailsRepository fluxDetailsRepository,
                              FluxDestinationRepository fluxDestinationRepository,
                              FluxSourceRepository fluxSourceRepository){
        this.fluxDetailsRepository = fluxDetailsRepository;
        this.fluxDestinationRepository = fluxDestinationRepository;
        this.fluxSourceRepository = fluxSourceRepository;
    }

    public FluxDetails create(FluxDetails fluxDetails){

        FluxDetails details = fluxDetailsRepository.save(fluxDetails);

        List<FluxDestination> destinations = new ArrayList<>(fluxDetails.getDestinations());
        fluxDetails.getDestinations().clear();
        List<FluxSource> sources = new ArrayList<>(fluxDetails.getFluxSources());
        fluxDetails.getFluxSources().clear();

        for (FluxDestination x : destinations){
            FluxDestination _destination = fluxDestinationRepository.save(x);
            details.getDestinations().add(_destination);
        }

        for (FluxSource x : sources){
            FluxSource _source = fluxSourceRepository.save(x);
            details.getFluxSources().add(_source);
        }

        return fluxDetailsRepository.save(details);
    }

    public List<FluxDetails> getAll(){
        return fluxDetailsRepository.findAll();
    }
}

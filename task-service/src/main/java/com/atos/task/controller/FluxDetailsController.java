package com.atos.task.controller;

import com.atos.task.model.FluxDetails;
import com.atos.task.service.FluxDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FluxDetailsController {
    final FluxDetailsService fluxDetailsService;

    public FluxDetailsController(FluxDetailsService fluxDetailsService){
        this.fluxDetailsService = fluxDetailsService;
    }

    @GetMapping("/flux-details")
    public ResponseEntity<List<FluxDetails>> getAllFluxDetails(){
        try {
            List<FluxDetails> fluxDetailsList = fluxDetailsService.getAll();
            return new ResponseEntity<>(fluxDetailsList, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/flux-details")
    public ResponseEntity<FluxDetails> postFluxDetails(@RequestBody FluxDetails fluxDetails){
        try {
            FluxDetails _fluxDetails  = fluxDetailsService.create(fluxDetails);
            return new ResponseEntity<>(_fluxDetails,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

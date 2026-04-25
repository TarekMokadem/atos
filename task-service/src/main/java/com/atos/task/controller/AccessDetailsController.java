package com.atos.task.controller;

import com.atos.task.model.AccessDetails;
import com.atos.task.repository.AccessDetailsRepository;
import com.atos.task.service.AccessDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AccessDetailsController {

    final AccessDetailsService accessDetailsService;

    public AccessDetailsController(AccessDetailsService accessDetailsService){
        this.accessDetailsService = accessDetailsService;
    }

    @GetMapping("/access-details")
    public ResponseEntity<List<AccessDetails>> getAllAccessRequests(){
        try{
            List<AccessDetails> requestDetailsList = accessDetailsService.getAll();
            return new ResponseEntity<>(requestDetailsList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/access-details")
    public ResponseEntity<AccessDetails> postAccessRequest(@RequestBody AccessDetails accessRequestDetails){
        try{
            AccessDetails _requestDetails = accessDetailsService.create(accessRequestDetails);
            return new ResponseEntity<>(_requestDetails,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/access-details/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id){
        try{
            accessDetailsService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

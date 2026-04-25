package com.atos.task.controller;

import com.atos.task.model.AccessDetails;
import com.atos.task.model.AccessPort;
import com.atos.task.model.AccessRequest;
import com.atos.task.repository.AccessPortRepository;
import com.atos.task.repository.AccessRequestRepository;
import com.atos.task.service.AccessRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AccessRequestController {

    final AccessRequestRepository accessRequestRepository;
    final AccessRequestService accessRequestService;

    public AccessRequestController(AccessRequestRepository accessRequestRepository,
                                   AccessRequestService accessRequestService){
        this.accessRequestRepository = accessRequestRepository;
        this.accessRequestService = accessRequestService;
    }

    @GetMapping("/access-requests")
    public ResponseEntity<List<AccessRequest>> getAllAccessRequests(){
        try{
            List<AccessRequest> requestList = accessRequestService.getAll();
            return new ResponseEntity<>(requestList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/access-requests")
    public ResponseEntity<AccessRequest> postAccessRequest(@RequestBody AccessRequest accessRequest){
        try{

            AccessRequest _request = accessRequestService.create(accessRequest);
            return new ResponseEntity<>(_request,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/access-requests")
    public ResponseEntity<HttpStatus> deleteAll(){
        try{
            accessRequestService.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

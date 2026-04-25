package com.atos.task.service;

import com.atos.task.model.AccessDetails;
import com.atos.task.model.AccessRequest;
import com.atos.task.repository.AccessRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class AccessRequestService {

    final AccessRequestRepository accessRequestRepository;
    final AccessDetailsService accessDetailsService;

    public AccessRequestService(AccessRequestRepository accessRequestRepository,
                                AccessDetailsService accessDetailsService){
        this.accessRequestRepository = accessRequestRepository;
        this.accessDetailsService =accessDetailsService;
    }

    public List<AccessRequest> getAll(){
        return accessRequestRepository.findAll();
    }

    public AccessRequest create(AccessRequest accessRequest){
        AccessRequest request = accessRequestRepository.save(accessRequest);
        try{
            List<AccessDetails> detailsList = new ArrayList<>(accessRequest.getAccessDetails());
            request.getAccessDetails().clear();
            for(AccessDetails x : detailsList){
                AccessDetails _details = accessDetailsService.create(x);
                request.getAccessDetails().add(_details);
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return accessRequestRepository.save(request);
    }

    /*public void deleteAll(){
        try{
            for(AccessRequest x : accessRequestRepository.findAll()){
                for(AccessDetails y : x.getAccessDetails()){
                    x.getAccessDetails().remove(y);
                    accessDetailsService.deleteById(y.getId());
                }
            }
        }catch (Exception e){
               e.printStackTrace();
        }
    }*/

    public void deleteAll() {
        try {
            for (AccessRequest accessRequest : accessRequestRepository.findAll()) {
                Iterator<AccessDetails> detailsIterator = accessRequest.getAccessDetails().iterator();
                while (detailsIterator.hasNext()) {
                    AccessDetails accessDetails = detailsIterator.next();
                    detailsIterator.remove(); // Remove from the collection
                    accessDetailsService.deleteById(accessDetails.getId()); // Delete from the repository
                }
            }
            accessRequestRepository.deleteAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

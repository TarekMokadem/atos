package com.atos.task.controller;

import com.atos.task.model.AccessPort;
import com.atos.task.repository.AccessPortRepository;
import com.atos.task.repository.AccessRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")

//FOR DEBUGGING PURPOSES
public class AccessPortController {
    final AccessPortRepository accessPortRepository;

    public AccessPortController(AccessPortRepository accessPortRepository){
        this.accessPortRepository = accessPortRepository;
    }

    @GetMapping("/ports")
    public  ResponseEntity<List<AccessPort>> getAll(){
        return new ResponseEntity<>(accessPortRepository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/ports")
    public ResponseEntity<AccessPort> create(@RequestBody AccessPort accessPort){
        try{
            return new ResponseEntity<>(accessPortRepository.save(accessPort), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/ports/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id){
        try{
            accessPortRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

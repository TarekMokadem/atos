package com.atos.task.controller;

import com.atos.task.model.*;
import com.atos.task.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class ResponsableController {
    final ResponsableService responsableService;

    public ResponsableController(ResponsableService responsableService){
        this.responsableService = responsableService;
    }

    @GetMapping("/responsable")
    public ResponseEntity<List<Responsable>> getAllResponsables(){
        try{
            return new ResponseEntity<>(responsableService.getAll(), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/responsable/{id}")
    public ResponseEntity<Optional<Responsable>> getResponsableById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(responsableService.findById(id), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/responsable")
    public ResponseEntity<Responsable> createTask(@RequestBody Responsable responsable){
        try{
            Responsable _responsable = responsableService.create(responsable);
            return new ResponseEntity<>(_responsable,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/responsable")
    public ResponseEntity<Responsable> editTask(@RequestBody Responsable responsable) {
        Responsable existingResponsable = responsableService.findByName(responsable.getName());
        if (existingResponsable == null) {
            return ResponseEntity.notFound().build();
        }
        existingResponsable.setName(responsable.getName());
        responsableService.create(existingResponsable);
        return ResponseEntity.ok(existingResponsable);
    }

    @DeleteMapping("/responsable/{id}")
    public void deleteTask(@PathVariable Long id){
        try{

            responsableService.deleteById(id);
        } catch (Exception e){
             new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

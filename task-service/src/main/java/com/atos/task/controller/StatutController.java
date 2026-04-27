package com.atos.task.controller;

import com.atos.task.model.*;
import com.atos.task.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class StatutController {
    final StatutService statutService;

    public StatutController(StatutService statutService){
        this.statutService = statutService;
    }

    @GetMapping("/statut")
    public ResponseEntity<List<Statut>> getAllStatuts(){
        try{
            return new ResponseEntity<>(statutService.getAll(), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/statut/{id}")
    public ResponseEntity<Optional<Statut>> getStatutById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(statutService.findById(id), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/statut")
    public ResponseEntity<Statut> createTask(@RequestBody Statut statut){
        try{
            Statut _statut = statutService.create(statut);
            return new ResponseEntity<>(_statut,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/statut")
    public ResponseEntity<Statut> editTask(@RequestBody Statut statut) {
        if (statut.getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        return statutService.findById(statut.getId())
                .map(existing -> {
                    if (statut.getName() != null) {
                        existing.setName(statut.getName());
                    }
                    return ResponseEntity.ok(statutService.create(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/statut/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            statutService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}

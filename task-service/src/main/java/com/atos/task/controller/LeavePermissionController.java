package com.atos.task.controller;

import com.atos.task.model.*;
import com.atos.task.service.LeavePermissionService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/v1")
public class LeavePermissionController {
    final LeavePermissionService leavePermissionService;

    public LeavePermissionController(LeavePermissionService leavePermissionService){
        this.leavePermissionService = leavePermissionService;
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<LeavePermission>> getAllLeaves(){
        try{
            return new ResponseEntity<>(leavePermissionService.getAll(), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/leaves/{id}")
    public ResponseEntity<Optional<LeavePermission>> getLeaveById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(leavePermissionService.findById(id), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/leaves/{field}/{id}")
    public ResponseEntity<Stream<String>> getLeaveRespById(@PathVariable String field,@PathVariable Long id){
        try{
            return new ResponseEntity<>(leavePermissionService.findById(id).stream().map(leavePermission -> {
                switch (field) {
                    case "jour" :
                        return leavePermission.getJour().toString();
                    case "raison" :
                        return leavePermission.getRaison();
                    case "statut" :
                        return leavePermission.getStatut();
                }
                return null;
            }), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/leaves")
    public ResponseEntity<LeavePermission> createLeave(@RequestBody LeavePermission leavePermission){
        try{
            LeavePermission _leavePermission = leavePermissionService.create(leavePermission);
            return new ResponseEntity<>(_leavePermission,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/leaves/edit")
    public ResponseEntity<LeavePermission> editLeave(@RequestBody LeavePermission leavePermission,@RequestParam String statut){
        try{
            LeavePermission _leavePermission = leavePermissionService.edit(leavePermission, statut);
            return new ResponseEntity<>(_leavePermission,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/leaves")
    public ResponseEntity<LeavePermission> editLeave2(@RequestBody LeavePermission leavePermission){
        try{
            LeavePermission _leavePermission = leavePermissionService.edit2(leavePermission);
            return new ResponseEntity<>(_leavePermission,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/leaves/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable Long id) {
        try {
            leavePermissionService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}

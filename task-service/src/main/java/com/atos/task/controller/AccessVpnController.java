package com.atos.task.controller;

import com.atos.task.model.AccessPort;
import com.atos.task.model.AccessVpn;
import com.atos.task.repository.AccessPortRepository;
import com.atos.task.service.AccessVpnService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")

//FOR DEBUGGING PURPOSES
public class AccessVpnController {
    final AccessVpnService accessVpnService;
    final AccessPortRepository accessPortRepository;

    public AccessVpnController(AccessVpnService accessVpnService, AccessPortRepository accessPortRepository){
        this.accessVpnService = accessVpnService;
        this.accessPortRepository =accessPortRepository;
    }

    @GetMapping("/access-vpns")
    public ResponseEntity<List<AccessVpn>> getAll(){
        try{
            return new ResponseEntity<>(accessVpnService.getAll(), HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/access-vpns")
    public ResponseEntity<AccessVpn> create(@RequestBody AccessVpn accessVpn){
        try{
            AccessVpn _accessVpn = accessVpnService.create(accessVpn);
            List<AccessPort> accessPorts = accessVpn.getAccessPorts();
            for(AccessPort _x : accessPorts){
                _x.setAccessVpn(_accessVpn);
            }
            List<AccessPort> _accessPorts = accessPortRepository.saveAll(accessPorts);

            return new ResponseEntity<>(_accessVpn,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/access-vpns/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id){
        try{
            accessVpnService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

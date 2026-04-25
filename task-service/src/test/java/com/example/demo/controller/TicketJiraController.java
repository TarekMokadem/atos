package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TicketJiraController {


    final TicketJiraRepository ticketJiraRepository;

    public TicketJiraController(TicketJiraRepository ticketJiraRepository){
        this.ticketJiraRepository = ticketJiraRepository;
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketJira>> getAllTickets(){
        try{
            List<TicketJira> ticketList = new ArrayList<>();
            ticketList.addAll(ticketJiraRepository.findAll());
            if(ticketList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ticketList, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/tickets")
    public ResponseEntity<TicketJira> createTicket(@RequestBody TicketJira ticket){
        try {
            TicketJira _ticket = ticketJiraRepository.save(ticket);
            return new ResponseEntity<>(_ticket, HttpStatus.CREATED);

        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<TicketJira> updateTicket(@PathVariable("id") long id,@RequestBody TicketJira ticket){
        try{
            Optional<TicketJira> ticketData = ticketJiraRepository.findById(id);
            if(ticketData.isPresent()){
                //TODO Review the update logic (call setters manually or use copyProperties?)
                TicketJira _ticket = ticketData.get();
                BeanUtils.copyProperties(ticket, _ticket, "id");
                return new ResponseEntity<>(_ticket, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<HttpStatus> deleteTicket(@PathVariable("id") long id){
        try{
            ticketJiraRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
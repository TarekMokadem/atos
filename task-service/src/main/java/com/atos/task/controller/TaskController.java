package com.atos.task.controller;

import com.atos.task.model.*;
import com.atos.task.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/v1")
public class TaskController {
    final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        try{
            return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable Long id){
        try{
            return new ResponseEntity<>(taskService.findById(id), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tasks/{field}/{id}")
    public ResponseEntity<Stream<String>> getTaskRespById(@PathVariable String field,@PathVariable Long id){
        try{
            return new ResponseEntity<>(taskService.findById(id).stream().map(task -> {
                switch (field) {
                    case "ticket" :
                        return task.getTicket();
                    case "description" :
                        return task.getDescription();
                    case "responsable" :
                        return task.getResponsable();
                }
                return null;
            }), HttpStatus.OK);
        } catch(Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        try{
            Task _task = taskService.create(task);
            return new ResponseEntity<>(_task,HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/tasks")
    public ResponseEntity<Task> editTask(@RequestBody Task task) {
        Task existingTask = taskService.findByTicket(task.getTicket());
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        existingTask.setType(task.getType());
        existingTask.setStatut(task.getStatut());
        existingTask.setResponsable(task.getResponsable());
        existingTask.setDescription(task.getDescription());
        existingTask.setChDev(task.getChDev());
        existingTask.setChiffrage(task.getChiffrage());
        if (task.getDevTig() != null) {
            existingTask.setDevTig(task.getDevTig());
        }
        if (task.getLivraisonTig() != null) {
            existingTask.setLivraisonTig(task.getLivraisonTig());
        }
        if (task.getDateReponse() != null) {
            existingTask.setDateReponse(task.getDateReponse());
        }
        existingTask.setAst(task.getAst());
        existingTask.setCommentaire(task.getCommentaire());

        taskService.create(existingTask);
        return ResponseEntity.ok(existingTask);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id){
        try{

             taskService.deleteById(id);
        } catch (Exception e){
             new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

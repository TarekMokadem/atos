package com.atos.task.service;

import com.atos.task.model.*;
import com.atos.task.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class TaskService {

    final TaskRepository responsableRepository;

    public TaskService(TaskRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    public List<Task> getAll() {
        return responsableRepository.findAll();
    }

    public Optional<Task> findById(Long id) {
        Optional<Task> res = responsableRepository.findById(id);
        return res;
    }

    public Task findByTicket(String ticket) {
        return responsableRepository.findByTicket(ticket);
    }
    public Task create(Task task) {
        return responsableRepository.save(task);
    }

    public void deleteById(Long id) {
        responsableRepository.deleteById(id);
    }

    public void addAccessRequestDetails() {

    }

}

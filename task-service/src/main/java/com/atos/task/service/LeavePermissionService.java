package com.atos.task.service;

import com.atos.task.model.*;
import com.atos.task.repository.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class LeavePermissionService {

    final LeavePermissionRepository leaveRepository;

    public LeavePermissionService(LeavePermissionRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public List<LeavePermission> getAll() {
        return leaveRepository.findAll();
    }

    public Optional<LeavePermission> findById(Long id) {
        Optional<LeavePermission> res = leaveRepository.findById(id);
        return res;
    }

    public LeavePermission create(LeavePermission leavePermission) {
        return leaveRepository.save(leavePermission);
    }

    public LeavePermission edit(LeavePermission leavePermission, String statut) {
        Long leaveId = leavePermission.getId();
        leaveRepository.delete(leavePermission);
        leavePermission.setStatut(statut);
        leavePermission.setId(leaveId);
        return leaveRepository.save(leavePermission);
    }
    public LeavePermission edit2(LeavePermission leavePermission) {
        return leaveRepository.save(leavePermission);
    }

    public void deleteById(Long id) {
        leaveRepository.deleteById(id);
    }

}

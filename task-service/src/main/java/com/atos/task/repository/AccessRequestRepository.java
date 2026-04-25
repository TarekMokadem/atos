package com.atos.task.repository;

import com.atos.task.model.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessRequestRepository extends JpaRepository<AccessRequest,Long> {
}

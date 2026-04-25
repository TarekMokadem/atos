package com.example.demo.repository;

import com.example.demo.model.TicketJira;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketJiraRepository extends JpaRepository<TicketJira, Long> {
}

package com.atos.task.repository;

import com.atos.task.model.*;
import org.springframework.data.jpa.repository.*;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByTicket(String ticket);


}

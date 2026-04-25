package com.atos.task.repository;

import com.atos.task.model.*;
import org.springframework.data.jpa.repository.*;

public interface StatutRepository extends JpaRepository<Statut, Long> {
    Statut findByName(String name);


}

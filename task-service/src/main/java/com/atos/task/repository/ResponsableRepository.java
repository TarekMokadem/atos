package com.atos.task.repository;

import com.atos.task.model.*;
import org.springframework.data.jpa.repository.*;

public interface ResponsableRepository extends JpaRepository<Responsable, Long> {
    Responsable findByName(String name);


}

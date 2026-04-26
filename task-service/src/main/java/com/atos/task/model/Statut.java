package com.atos.task.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.*;

import java.util.*;

@Data
@Builder

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Statut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;



}

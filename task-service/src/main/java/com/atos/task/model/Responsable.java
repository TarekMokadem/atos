package com.atos.task.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Responsable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;



}

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
public class LeavePermission {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date jour;
    private Integer duree;
    private String raison;
    private String statut;
    private String employe;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateDemande;



}

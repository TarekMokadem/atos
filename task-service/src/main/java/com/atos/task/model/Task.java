package com.atos.task.model;
import lombok.*;
import org.springframework.format.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder

@Entity
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ticket;
    private String description;
    private String type;
    private String statut;
    private String responsable;
    private float chDev;
    private float chiffrage;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date devTig;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date livraisonTig;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateReponse;
    private Boolean ast;
    private String commentaire;



}

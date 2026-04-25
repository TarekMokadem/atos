package com.example.demo.model;

import com.example.demo.model.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@NoArgsConstructor @Getter @Setter
public class Task {

    @Id
    @GeneratedValue
    private long id;

    private String statut;

    private String description;

    private String commentaire;

    private float chDev;

    private float chiffrage;

    private Date livraisonTig;

    private Date dateReponse;

    private String ast;

    @ManyToMany(mappedBy = "tasks")
    private Set<Employee> responsables;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="ticket_jira_id", referencedColumnName = "id")
    private TicketJira ticketJira;

}

package com.example.demo.model;

import com.example.demo.model.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@NoArgsConstructor @Getter @Setter
public class Employee {
    @Id
    @GeneratedValue
    private long id;

    @Column(name="nom")
    private String nom;

    @Column(name="prenom")
    private String prenom;

    @Column(name="email")
    private String email;

    @ManyToMany
    @JoinTable
    private Set<Task> tasks;

    @OneToMany(mappedBy = "employee")
    private Set<Leave> leaves;
}

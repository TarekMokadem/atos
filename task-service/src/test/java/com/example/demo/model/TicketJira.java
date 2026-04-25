package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor @Getter @Setter
public class TicketJira {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="link")
    private String link;

}

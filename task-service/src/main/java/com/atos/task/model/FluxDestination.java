package com.atos.task.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class FluxDestination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ip;
    private String identification;
    private int port;

    @ManyToOne
    @JoinColumn(name = "flux_details_id")
    private FluxDetails fluxDetails;
}

package com.atos.task.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor @Getter @Setter
public class FluxDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @OneToMany(mappedBy = "fluxDetails")
    private List<FluxSource> fluxSources;

    @OneToMany(mappedBy = "fluxDetails")
    private List<FluxDestination> destinations;

    @ManyToOne
    @JoinColumn(name = "flux_request_id")
    private FluxRequest fluxRequest;
}

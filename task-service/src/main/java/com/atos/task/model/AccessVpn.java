package com.atos.task.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor @Getter @Setter
public class AccessVpn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ip;
    private String description;
    private String module;
    private String environment;

    @OneToMany(mappedBy = "accessVpn")
    @JsonManagedReference
    private List<AccessPort> accessPorts;

    @ManyToOne
    @JoinColumn(name = "access_details_id")
    @JsonBackReference
    private AccessDetails accessDetails;
}

package com.atos.task.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@NoArgsConstructor @Getter @Setter
public class AccessDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @ManyToOne
    @JoinColumn(name="access_request_id")
    @JsonBackReference
    private AccessRequest accessRequest;

    @ManyToMany
    @JoinTable(
            name = "user_access_details",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "access_details_id")
    )
    private List<User> users;

    @OneToMany(mappedBy = "accessDetails")
    @JsonManagedReference
    private List<AccessVpn> accessVpns;
}

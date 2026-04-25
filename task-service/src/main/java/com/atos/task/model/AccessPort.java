package com.atos.task.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor @Getter @Setter
public class AccessPort {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private String description ;


    @ManyToOne
    @JoinColumn(name = "access_vpn_id")
    @JsonBackReference
    private AccessVpn accessVpn;
}
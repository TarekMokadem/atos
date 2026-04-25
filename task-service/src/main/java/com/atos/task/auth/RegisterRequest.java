package com.atos.task.auth;

import com.atos.task.model.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String equipe;
    private String domaine;
    private String mobile;
    @Enumerated(EnumType.STRING)
    private Role role;
}

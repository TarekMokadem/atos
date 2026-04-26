package com.atos.task.config;

import com.atos.task.model.Role;
import com.atos.task.model.User;
import com.atos.task.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;

/**
 * Crée un compte administrateur au premier démarrage si la base ne contient aucun utilisateur.
 * Configure sur l'hébergeur : {@code BOOTSTRAP_ADMIN_PASSWORD} (obligatoire pour créer le compte),
 * et optionnellement {@code BOOTSTRAP_ADMIN_EMAIL} (défaut {@code admin@local.dev}).
 */
@Component
@Order(100)
@ConditionalOnProperty(name = "app.demo", havingValue = "false", matchIfMissing = true)
@Slf4j
@RequiredArgsConstructor
public class AdminUserBootstrapRunner implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${BOOTSTRAP_ADMIN_EMAIL:admin@local.dev}")
    private String adminEmail;

    @Value("${BOOTSTRAP_ADMIN_PASSWORD:}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() > 0) {
            return;
        }
        if (!StringUtils.hasText(adminPassword)) {
            log.warn(
                    "Aucun utilisateur en base mais BOOTSTRAP_ADMIN_PASSWORD est vide : pas de compte admin créé. "
                            + "Définissez BOOTSTRAP_ADMIN_PASSWORD (et éventuellement BOOTSTRAP_ADMIN_EMAIL) sur Render puis redéployez.");
            return;
        }

        String email = adminEmail.trim().toLowerCase();
        if (userRepository.findByEmail(email) != null) {
            return;
        }

        User admin = User.builder()
                .firstname("Admin")
                .lastname("System")
                .creationDate(new Date())
                .email(email)
                .password(passwordEncoder.encode(adminPassword))
                .equipe("-")
                .domaine("-")
                .mobile("-")
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);
        log.info("Compte administrateur initial créé pour l'email : {}", email);
    }
}

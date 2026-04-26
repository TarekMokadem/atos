package com.atos.task.config;

import com.atos.task.model.*;
import com.atos.task.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

/**
 * Données de démonstration (comptes + jeux d’essai) lorsque {@code app.demo=true}.
 * Les identifiants sont alignés avec les constantes affichées sur l’écran de connexion (frontend).
 */
@Component
@Order(100)
@ConditionalOnProperty(name = "app.demo", havingValue = "true")
@Slf4j
@RequiredArgsConstructor
public class DemoDataBootstrapRunner implements ApplicationRunner {

    public static final String DEMO_ADMIN_EMAIL = "demo.admin@atos.fr";
    public static final String DEMO_ADMIN_PASSWORD = "DemoAdmin2026!";
    public static final String DEMO_USER_EMAIL = "demo.user@atos.fr";
    public static final String DEMO_USER_PASSWORD = "DemoUser2026!";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TaskRepository taskRepository;
    private final LeavePermissionRepository leavePermissionRepository;
    private final StatutRepository statutRepository;
    private final ResponsableRepository responsableRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.findByEmail(DEMO_ADMIN_EMAIL) != null) {
            log.info("Données démo déjà présentes ({}), aucun rechargement.", DEMO_ADMIN_EMAIL);
            return;
        }

        Date now = new Date();

        User admin = User.builder()
                .firstname("Alexandre")
                .lastname("Démo")
                .creationDate(now)
                .email(DEMO_ADMIN_EMAIL)
                .password(passwordEncoder.encode(DEMO_ADMIN_PASSWORD))
                .equipe("Delivery")
                .domaine("SI")
                .mobile("+33 6 00 00 00 01")
                .role(Role.ADMIN)
                .build();
        User user = User.builder()
                .firstname("Sophie")
                .lastname("Collaborateur")
                .creationDate(now)
                .email(DEMO_USER_EMAIL)
                .password(passwordEncoder.encode(DEMO_USER_PASSWORD))
                .equipe("Delivery")
                .domaine("SI")
                .mobile("+33 6 00 00 00 02")
                .role(Role.USER)
                .build();
        userRepository.save(admin);
        userRepository.save(user);

        statutRepository.save(Statut.builder().name("En cours").build());
        statutRepository.save(Statut.builder().name("En attente").build());
        statutRepository.save(Statut.builder().name("Terminé").build());

        responsableRepository.save(Responsable.builder().name("Jean Dupont").build());
        responsableRepository.save(Responsable.builder().name("Marie Martin").build());
        responsableRepository.save(Responsable.builder().name("Sophie Collaborateur").build());

        Calendar cal = Calendar.getInstance();
        taskRepository.save(task("DEMO-101", "Portail client – export Excel", "Feature", "En cours", "Jean Dupont", 3f, 5f, cal, false));
        cal.add(Calendar.DAY_OF_MONTH, 7);
        taskRepository.save(task("DEMO-102", "API livraison – gestion des erreurs 503", "Bugfix", "En attente", "Marie Martin", 1.5f, 2f, cal, true));
        cal.add(Calendar.DAY_OF_MONTH, 14);
        taskRepository.save(task("DEMO-103", "Refonte écran congés (maquette Atos)", "UX", "Terminé", "Sophie Collaborateur", 2f, 3f, cal, false));

        leavePermissionRepository.save(LeavePermission.builder()
                .jour(addDays(now, 10))
                .duree(2)
                .raison("Formation interne (données fictives)")
                .statut("En attente")
                .employe("Sophie Collaborateur")
                .dateDemande(now)
                .build());
        leavePermissionRepository.save(LeavePermission.builder()
                .jour(addDays(now, 25))
                .duree(1)
                .raison("Rendez-vous médical (exemple)")
                .statut("Validé")
                .employe("Jean Dupont")
                .dateDemande(now)
                .build());

        // Chevauchement volontaire pour le calendrier (même période, employés différents)
        Date overlapStart = addDays(now, 18);
        leavePermissionRepository.save(LeavePermission.builder()
                .jour(overlapStart)
                .duree(4)
                .raison("Congés famille (fictif) — bloc A")
                .statut("Validé")
                .employe("Sophie Collaborateur")
                .dateDemande(now)
                .build());
        leavePermissionRepository.save(LeavePermission.builder()
                .jour(overlapStart)
                .duree(3)
                .raison("Congés famille (fictif) — bloc B chevauché")
                .statut("En attente")
                .employe("Jean Dupont")
                .dateDemande(now)
                .build());
        leavePermissionRepository.save(LeavePermission.builder()
                .jour(addDays(now, 20))
                .duree(2)
                .raison("Demi-journées (exemple chevauchement partiel)")
                .statut("En attente")
                .employe("Marie Martin")
                .dateDemande(now)
                .build());

        log.info("Jeu de démo chargé : admin {} / utilisateur {}.", DEMO_ADMIN_EMAIL, DEMO_USER_EMAIL);
    }

    private static Task task(String ticket, String description, String type, String statut, String responsable,
                             float chDev, float chiffrage, Calendar livraison, Boolean ast) {
        return Task.builder()
                .ticket(ticket)
                .description(description)
                .type(type)
                .statut(statut)
                .responsable(responsable)
                .chDev(chDev)
                .chiffrage(chiffrage)
                .devTig(new Date())
                .livraisonTig(livraison.getTime())
                .dateReponse(new Date())
                .ast(ast)
                .commentaire("Données illustratives – expérience professionnelle chez Atos.")
                .build();
    }

    private static Date addDays(Date from, int days) {
        Calendar c = Calendar.getInstance();
        c.setTime(from);
        c.add(Calendar.DAY_OF_MONTH, days);
        return c.getTime();
    }
}

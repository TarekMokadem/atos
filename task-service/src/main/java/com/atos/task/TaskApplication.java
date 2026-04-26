package com.atos.task;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("./task-service").ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // Aiven : mysql://... — Spring exige jdbc:mysql://... Les variables d'env Render sont visibles
        // via System.getenv ; un EnvironmentPostProcessor seul peut ne pas être chargé selon l'empaquetage.
        normalizeMysqlJdbcDataSourceUrl();

        SpringApplication.run(TaskApplication.class, args);
    }

    private static void normalizeMysqlJdbcDataSourceUrl() {
        String raw = firstNonBlank(
                System.getenv("SPRING_DATASOURCE_URL"),
                System.getProperty("SPRING_DATASOURCE_URL"),
                System.getProperty("spring.datasource.url"));
        if (raw == null || raw.isBlank() || raw.contains("${")) {
            return;
        }
        String t = raw.trim();
        if (t.startsWith("jdbc:")) {
            return;
        }
        if (!t.startsWith("mysql://")) {
            return;
        }
        String jdbc = "jdbc:" + t;
        jdbc = jdbc.replace("ssl-mode=", "sslMode=").replace("SSL-MODE=", "sslMode=");
        System.setProperty("spring.datasource.url", jdbc);
    }

    private static String firstNonBlank(String... values) {
        if (values == null) {
            return null;
        }
        for (String v : values) {
            if (v != null && !v.isBlank()) {
                return v;
            }
        }
        return null;
    }
}

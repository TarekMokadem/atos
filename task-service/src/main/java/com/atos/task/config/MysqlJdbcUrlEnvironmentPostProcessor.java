package com.atos.task.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Aiven fournit souvent {@code mysql://...} ; Spring / Hikari exigent {@code jdbc:mysql://...}.
 * <p>
 * Au moment où les {@link EnvironmentPostProcessor} s'exécutent, {@code spring.datasource.url}
 * peut encore contenir le placeholder du {@code application.properties} au lieu de la valeur
 * résolue. On lit donc d'abord {@code SPRING_DATASOURCE_URL} (y compris via {@link System#getenv}).
 */
public class MysqlJdbcUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String SPRING_DATASOURCE_URL = "SPRING_DATASOURCE_URL";
    private static final String TARGET_KEY = "spring.datasource.url";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Render / Aiven : la variable d'environnement brute est la source la plus fiable.
        String candidate = firstNonBlank(
                System.getenv(SPRING_DATASOURCE_URL),
                environment.getProperty(SPRING_DATASOURCE_URL),
                environment.getProperty(TARGET_KEY));

        if (candidate == null) {
            return;
        }
        String trimmed = candidate.trim();
        if (trimmed.contains("${")) {
            return;
        }
        if (trimmed.startsWith("jdbc:")) {
            return;
        }
        if (!trimmed.startsWith("mysql://")) {
            return;
        }

        String jdbcUrl = "jdbc:" + trimmed;
        jdbcUrl = jdbcUrl.replace("ssl-mode=", "sslMode=");
        jdbcUrl = jdbcUrl.replace("SSL-MODE=", "sslMode=");

        Map<String, Object> map = new LinkedHashMap<>();
        map.put(TARGET_KEY, jdbcUrl);
        environment.getPropertySources().addFirst(new MapPropertySource("mysqlJdbcUrlNormalized", map));
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

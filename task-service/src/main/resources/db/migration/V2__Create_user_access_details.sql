-- Jointure User <-> AccessDetails. Pas de FK ici : Flyway s'exécute avant Hibernate sur une base vide ;
-- Hibernate (ddl-auto=update) peut ajouter les contraintes une fois les tables parentes créées.
CREATE TABLE IF NOT EXISTS user_access_details (
    access_details_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (access_details_id, user_id)
);

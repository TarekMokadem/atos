package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Locale;

/**
 * Corrige l'erreur MySQL 1364 « Field 'id' doesn't have a default value » lorsque les tables
 * ont été créées sans AUTO_INCREMENT sur la clé primaire. Hibernate {@code ddl-auto=update} ne
 * répare pas toujours ce cas sur une base déjà peuplée.
 */
public class V1__Repair_mysql_identity_columns extends BaseJavaMigration {

    private static final String[] TABLES = {
            "statut",
            "responsable",
            "leave_permission",
            "task",
            "user",
            "access_details",
            "access_request",
            "flux_details",
            "flux_request",
            "flux_destination",
            "access_port",
            "access_vpn",
            "flux_source",
    };

    @Override
    public void migrate(Context context) throws Exception {
        Connection conn = context.getConnection();
        String product = conn.getMetaData().getDatabaseProductName();
        if (product == null) {
            return;
        }
        String p = product.toLowerCase(Locale.ROOT);
        if (!p.contains("mysql") && !p.contains("mariadb")) {
            return;
        }

        for (String table : TABLES) {
            if (!tableExists(conn, table)) {
                continue;
            }
            String quoted = quoteTable(table);
            String sql = "ALTER TABLE " + quoted + " MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT";
            try (Statement st = conn.createStatement()) {
                st.execute(sql);
            }
        }
    }

    private static String quoteTable(String table) {
        return "`" + table.replace("`", "") + "`";
    }

    private static boolean tableExists(Connection conn, String table) throws Exception {
        String sql =
                "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND LOWER(table_name) = LOWER(?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, table);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() && rs.getInt(1) > 0;
            }
        }
    }
}

package util;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBConnection {
    private static String URL;
    private static String USER;
    private static String PASSWORD;

    static {
        try {
            Properties props = new Properties();
            props.load(new FileInputStream(".env"));
            URL = props.getProperty("DB_URL");
            USER = props.getProperty("DB_USER");
            PASSWORD = props.getProperty("DB_PASS");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load .env file: " + e.getMessage());
        }
    }

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Database connected");
            return connection;
        } catch (Exception e) {
            throw new RuntimeException("Database connection error: " + e.getMessage());
        }
    }
}

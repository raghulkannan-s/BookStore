package dao;

import model.User;
import util.DBConnection;
import java.sql.*;
import java.security.MessageDigest;


public class UserDAO {


    private String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes("UTF-8"));

        StringBuilder sb = new StringBuilder();
        for (byte b : hash) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }


    public boolean register(User user) {
    String sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    try (Connection conn = DBConnection.getConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        String hashed = hashPassword(user.getPassword());

        ps.setString(1, user.getName());
        ps.setString(2, user.getEmail());
        ps.setString(3, hashed);
        ps.executeUpdate();
        return true;

    } catch (Exception e) {
        System.out.println("❌ Registration failed: " + e.getMessage());
        return false;
    }
}


    public User login(String email, String password) {
    String sql = "SELECT * FROM users WHERE email=? AND password=?";
    try (Connection conn = DBConnection.getConnection();
         PreparedStatement ps = conn.prepareStatement(sql)) {

        String hashed = hashPassword(password);

        ps.setString(1, email);
        ps.setString(2, hashed);
        ResultSet rs = ps.executeQuery();

        if (rs.next()) {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            return user;
        }

    } catch (Exception e) {
        System.out.println("❌ Login failed: " + e.getMessage());
    }
    return null;
}

}

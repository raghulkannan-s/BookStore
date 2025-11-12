package dao;

import model.Book;
import util.DBConnection;
import java.sql.*;
import java.util.*;

public class BookDAO {
    public List<Book> getAll() {
        List<Book> list = new ArrayList<>();
        String sql = "SELECT * FROM books";
        try (Connection conn = DBConnection.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Book(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getDouble("price"),
                    rs.getInt("stock")
                ));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return list;
    }

    public void add(Book b) {
        String sql = "INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, b.getTitle());
            ps.setString(2, b.getAuthor());
            ps.setDouble(3, b.getPrice());
            ps.setInt(4, b.getStock());
            ps.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}

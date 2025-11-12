import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import dao.BookDAO;
import dao.CustomerDAO;
import model.Book;
import model.Customer;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import com.google.gson.Gson;

public class AppServer {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(9090), 0);

        server.createContext("/api/books", new BookHandler());
        server.createContext("/api/customers", new CustomerHandler());

        server.setExecutor(null);
        System.out.println("✅ Server running at http://localhost:9090");
        server.start();
    }

    // ---------------- BOOK HANDLER ----------------
    static class BookHandler implements HttpHandler {
        private final BookDAO dao = new BookDAO();
        private final Gson gson = new Gson();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if (method.equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (method.equalsIgnoreCase("GET")) {
                List<Book> books = dao.getAll();
                sendResponse(exchange, gson.toJson(books), 200);
            } 
            else if (method.equalsIgnoreCase("POST")) {
                InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                Book book = gson.fromJson(reader, Book.class);
                if(book.getTitle() == null || book.getAuthor() == null || book.getPrice() <= 0 || book.getStock() < 0) {
                    sendResponse(exchange, "{\"error\":\"Missing or invalid fields in book data\"}", 400);
                    return;
                }
                dao.add(book);
                sendResponse(exchange, "{\"message\":\"Book added\"}", 201);
            } 
            else {
                sendResponse(exchange, "{\"error\":\"Unsupported method\"}", 405);
            }
        }

        private void sendResponse(HttpExchange exchange, String response, int code) throws IOException {
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }

    // ---------------- CUSTOMER HANDLER ----------------
    static class CustomerHandler implements HttpHandler {
        private final CustomerDAO dao = new CustomerDAO();
        private final Gson gson = new Gson();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if (method.equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (method.equalsIgnoreCase("GET")) {
                List<Customer> customers = dao.getAllCustomers();
                sendResponse(exchange, gson.toJson(customers), 200);
            } 
            else if (method.equalsIgnoreCase("POST")) {
                InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                Customer customer = gson.fromJson(reader, Customer.class);
                if(customer.getName() == null || customer.getEmail() == null || customer.getPhone() == null) {
                    sendResponse(exchange, "{\"error\":\"Missing fields in customer data\"}", 400);
                    return;
                }
                dao.addCustomer(customer);
                sendResponse(exchange, "{\"message\":\"Customer added\"}", 201);
            } 
            else {
                sendResponse(exchange, "{\"error\":\"Unsupported method\"}", 405);
            }
        }

        private void sendResponse(HttpExchange exchange, String response, int code) throws IOException {
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }
}

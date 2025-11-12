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
            String path = exchange.getRequestURI().getPath();
            String[] parts = path.split("/");
            Integer id = parts.length > 3 ? tryParse(parts[3]) : null;

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if (method.equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            try {
                switch (method) {
                    case "GET":
                        if (id == null) {
                            List<Book> books = dao.getAll();
                            sendResponse(exchange, gson.toJson(books), 200);
                        }
                        break;

                    case "POST":
                        Book book = gson.fromJson(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8), Book.class);
                        dao.add(book);
                        sendResponse(exchange, "{\"message\":\"Book added\"}", 201);
                        break;

                    case "PUT":
                        if (id == null) {
                            sendResponse(exchange, "{\"error\":\"Book ID missing in URL\"}", 400);
                            return;
                        }
                        Book updatedBook = gson.fromJson(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8), Book.class);
                        updatedBook.setId(id);
                        dao.update(updatedBook);
                        sendResponse(exchange, "{\"message\":\"Book updated\"}", 200);
                        break;

                    case "DELETE":
                        if (id == null) {
                            sendResponse(exchange, "{\"error\":\"Book ID missing in URL\"}", 400);
                            return;
                        }
                        dao.delete(id);
                        sendResponse(exchange, "{\"message\":\"Book deleted\"}", 200);
                        break;

                    default:
                        sendResponse(exchange, "{\"error\":\"Unsupported method\"}", 405);
                }
            } catch (Exception e) {
                sendResponse(exchange, "{\"error\":\"" + e.getMessage() + "\"}", 500);
            }
        }

        private Integer tryParse(String s) {
            try { return Integer.parseInt(s); } catch (Exception e) { return null; }
        }

        private void sendResponse(HttpExchange exchange, String response, int code) throws IOException {
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) { os.write(bytes); }
        }
    }

    // ---------------- CUSTOMER HANDLER ----------------
    static class CustomerHandler implements HttpHandler {
        private final CustomerDAO dao = new CustomerDAO();
        private final Gson gson = new Gson();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();
            String[] parts = path.split("/");
            Integer id = parts.length > 3 ? tryParse(parts[3]) : null;

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if (method.equalsIgnoreCase("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            try {
                switch (method) {
                    case "GET":
                        if (id == null) {
                            List<Customer> customers = dao.getAllCustomers();
                            sendResponse(exchange, gson.toJson(customers), 200);
                        }
                        break;

                    case "POST":
                        Customer c = gson.fromJson(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8), Customer.class);
                        dao.addCustomer(c);
                        sendResponse(exchange, "{\"message\":\"Customer added\"}", 201);
                        break;

                    case "PUT":
                        if (id == null) {
                            sendResponse(exchange, "{\"error\":\"Customer ID missing in URL\"}", 400);
                            return;
                        }
                        Customer updated = gson.fromJson(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8), Customer.class);
                        updated.setId(id);
                        dao.updateCustomer(updated);
                        sendResponse(exchange, "{\"message\":\"Customer updated\"}", 200);
                        break;

                    case "DELETE":
                        if (id == null) {
                            sendResponse(exchange, "{\"error\":\"Customer ID missing in URL\"}", 400);
                            return;
                        }
                        dao.deleteCustomer(id);
                        sendResponse(exchange, "{\"message\":\"Customer deleted\"}", 200);
                        break;

                    default:
                        sendResponse(exchange, "{\"error\":\"Unsupported method\"}", 405);
                }
            } catch (Exception e) {
                sendResponse(exchange, "{\"error\":\"" + e.getMessage() + "\"}", 500);
            }
        }

        private Integer tryParse(String s) {
            try { return Integer.parseInt(s); } catch (Exception e) { return null; }
        }

        private void sendResponse(HttpExchange exchange, String response, int code) throws IOException {
            byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) { os.write(bytes); }
        }
    }
}

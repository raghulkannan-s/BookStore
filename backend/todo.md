pom.xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>bookstore</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>bookstore</name>

    <properties>
        <java.version>17</java.version>
        <spring.boot.version>3.1.4</spring.boot.version>
    </properties>

    <dependencies>
        <!-- Spring Boot starter web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok (optional, used here to reduce boilerplate) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Test (excluded in this small starter) -->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>


# Project structure

backend/
├─ pom.xml
├─ src/main/java/com/example/bookstore/
│   ├─ BookstoreApplication.java
│   ├─ controller/
│   │   ├─ BookController.java
│   │   └─ CustomerController.java
│   ├─ model/
│   │   ├─ Book.java
│   │   └─ Customer.java
│   ├─ repository/
│   │   ├─ BookRepository.java
│   │   └─ CustomerRepository.java
│   └─ service/
│       ├─ BookService.java
│       └─ CustomerService.java
└─ src/main/resources/
    └─ application.properties


# src/main/java/com/example/bookstore/BookstoreApplication.java

package com.example.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookstoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookstoreApplication.class, args);
    }
}


# src/main/java/com/example/bookstore/model/Book.java

package com.example.bookstore.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String title;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String author;

    @PositiveOrZero
    @Column(nullable = false)
    private double price;

    @PositiveOrZero
    @Column(nullable = false)
    private int stock;
}


# src/main/java/com/example/bookstore/model/Customer.java

package com.example.bookstore.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String name;

    @Email
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 15)
    private String phone;
}


# src/main/java/com/example/bookstore/repository/BookRepository.java

package com.example.bookstore.repository;

import com.example.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}


# src/main/java/com/example/bookstore/repository/CustomerRepository.java

package com.example.bookstore.repository;

import com.example.bookstore.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}


# src/main/java/com/example/bookstore/service/BookService.java

package com.example.bookstore.service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> findAll() { return repo.findAll(); }
    public Optional<Book> findById(Long id) { return repo.findById(id); }
    public Book save(Book b) { return repo.save(b); }
    public void deleteById(Long id) { repo.deleteById(id); }
}


# src/main/java/com/example/bookstore/service/CustomerService.java

package com.example.bookstore.service;

import com.example.bookstore.model.Customer;
import com.example.bookstore.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) { this.repo = repo; }

    public List<Customer> findAll() { return repo.findAll(); }
    public Optional<Customer> findById(Long id) { return repo.findById(id); }
    public Customer save(Customer c) { return repo.save(c); }
    public void deleteById(Long id) { repo.deleteById(id); }
}


# src/main/java/com/example/bookstore/controller/BookController.java

package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    private final BookService service;

    public BookController(BookService service) { this.service = service; }

    @GetMapping
    public List<Book> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Book> get(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book book) {
        Book saved = service.save(book);
        return ResponseEntity.created(URI.create("/api/books/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody Book book) {
        return service.findById(id).map(existing -> {
            book.setId(existing.getId());
            Book updated = service.save(book);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


# src/main/java/com/example/bookstore/controller/CustomerController.java

package com.example.bookstore.controller;

import com.example.bookstore.model.Customer;
import com.example.bookstore.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) { this.service = service; }

    @GetMapping
    public List<Customer> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        Customer saved = service.save(customer);
        return ResponseEntity.created(URI.create("/api/customers/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer customer) {
        return service.findById(id).map(existing -> {
            customer.setId(existing.getId());
            Customer updated = service.save(customer);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


# src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
server.port=8080


# Notes

1. This is a minimal, local-first Spring Boot application using Lombok to reduce boilerplate. If you don't want Lombok, remove Lombok annotations and add constructors/getters/setters manually.
2. Replace `yourpassword` in application.properties with your MySQL root password (or create a dedicated DB user).
3. To run locally:
   - Create database: `CREATE DATABASE bookstore_db;`
   - Build & run: `mvn spring-boot:run` (from the project root where pom.xml is)
4. Next step (after this starter works): create Postman or test with curl, then implement simple validation/error-handling and DTOs if desired.


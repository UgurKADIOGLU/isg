package com.isg_otomasyon.ws.document;
import com.isg_otomasyon.ws.employee.Employee;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private String title;

    private String filePath;

    private String documentType;

    private LocalDateTime uploadedAt = LocalDateTime.now();
}


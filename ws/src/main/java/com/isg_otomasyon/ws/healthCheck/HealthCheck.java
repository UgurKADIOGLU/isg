package com.isg_otomasyon.ws.healthCheck;



import com.isg_otomasyon.ws.employee.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "health_checks")
public class HealthCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate date;

    private String result; // Uygun, Şartlı, Uygun Değil

    private String doctorName;

    @Column(length = 1000)
    private String notes;
}


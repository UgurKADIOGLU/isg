package com.isg_otomasyon.ws.accident;



import com.isg_otomasyon.ws.employee.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "accidents")
public class Accident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate date;

    @Column(length = 1000)
    private String description;

    private String location;

    private String severity; // Hafif, Orta, Ağır

    @Column(length = 1000)
    private String result;

    private String reportedBy;
}


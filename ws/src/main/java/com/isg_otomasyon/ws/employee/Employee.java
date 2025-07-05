package com.isg_otomasyon.ws.employee;

import com.isg_otomasyon.ws.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 11, unique = true, nullable = false)
    private String tcNo;

    private String department;

    private String position;

    private LocalDate birthDate;

    private String phone;

    private LocalDate startDate;

    private String bloodType;

    private String gender;

    private String status; // Aktif, Pasif
}


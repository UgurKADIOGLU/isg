package com.isg_otomasyon.ws.employeeTraining;


import com.isg_otomasyon.ws.employee.Employee;
import com.isg_otomasyon.ws.training.Training;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "employee_training")
public class EmployeeTraining {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Training training;

    private Boolean attendance;

    private Boolean certificateIssued;

    private LocalDate completedAt;
}


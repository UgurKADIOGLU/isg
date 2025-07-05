package com.isg_otomasyon.ws.riskAssessment;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "risk_assessments")
public class RiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String department;

    @Column(length = 1000)
    private String hazardDescription;

    private Integer riskScore;

    private Integer likelihood;

    private Integer severity;

    @Column(length = 1000)
    private String controlMeasures;

    private String responsiblePerson;

    private LocalDate assessmentDate;
}


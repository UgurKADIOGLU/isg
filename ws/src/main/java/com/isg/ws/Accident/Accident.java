package com.isg.ws.Accident;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.isg.ws.Employee.Employee;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Accident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate tarih;

    @Column(length = 2000)
    private String aciklama;

    private String fotoUrl;

    private String kokNedenAnalizi;  // 5N1K, Fishbone vb.

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public String getAciklama() {
        return aciklama;
    }

    public void setAciklama(String aciklama) {
        this.aciklama = aciklama;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getKokNedenAnalizi() {
        return kokNedenAnalizi;
    }

    public void setKokNedenAnalizi(String kokNedenAnalizi) {
        this.kokNedenAnalizi = kokNedenAnalizi;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}

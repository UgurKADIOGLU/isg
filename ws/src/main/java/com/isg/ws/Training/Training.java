package com.isg.ws.Training;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isg.ws.Employee.Employee;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Training {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String egitimAdi;

    private String egitmen;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate tarih;

    private boolean sertifikaVerildi;

    @ManyToMany
    @JoinTable(
            name = "training_participants",
            joinColumns = @JoinColumn(name = "training_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Employee> katilimcilar;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEgitimAdi() {
        return egitimAdi;
    }

    public void setEgitimAdi(String egitimAdi) {
        this.egitimAdi = egitimAdi;
    }

    public String getEgitmen() {
        return egitmen;
    }

    public void setEgitmen(String egitmen) {
        this.egitmen = egitmen;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public boolean isSertifikaVerildi() {
        return sertifikaVerildi;
    }

    public void setSertifikaVerildi(boolean sertifikaVerildi) {
        this.sertifikaVerildi = sertifikaVerildi;
    }

    public List<Employee> getKatilimcilar() {
        return katilimcilar;
    }

    public void setKatilimcilar(List<Employee> katilimcilar) {
        this.katilimcilar = katilimcilar;
    }
}

package com.isg.ws.Employee;

import com.isg.ws.Accident.Accident;
import com.isg.ws.Training.Training;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adSoyad;

    private String tcKimlik;

    private String departman;

    private String pozisyon;

    private LocalDate iseGirisTarihi;

    private LocalDate saglikRaporTarihi;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Accident> accidents;

    @ManyToMany(mappedBy = "katilimcilar")
    private List<Training> trainings;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdSoyad() {
        return adSoyad;
    }

    public void setAdSoyad(String adSoyad) {
        this.adSoyad = adSoyad;
    }

    public String getTcKimlik() {
        return tcKimlik;
    }

    public void setTcKimlik(String tcKimlik) {
        this.tcKimlik = tcKimlik;
    }

    public String getDepartman() {
        return departman;
    }

    public void setDepartman(String departman) {
        this.departman = departman;
    }

    public String getPozisyon() {
        return pozisyon;
    }

    public void setPozisyon(String pozisyon) {
        this.pozisyon = pozisyon;
    }

    public LocalDate getIseGirisTarihi() {
        return iseGirisTarihi;
    }

    public void setIseGirisTarihi(LocalDate iseGirisTarihi) {
        this.iseGirisTarihi = iseGirisTarihi;
    }

    public LocalDate getSaglikRaporTarihi() {
        return saglikRaporTarihi;
    }

    public void setSaglikRaporTarihi(LocalDate saglikRaporTarihi) {
        this.saglikRaporTarihi = saglikRaporTarihi;
    }

    public List<Accident> getAccidents() {
        return accidents;
    }

    public void setAccidents(List<Accident> accidents) {
        this.accidents = accidents;
    }

    public List<Training> getTrainings() {
        return trainings;
    }

    public void setTrainings(List<Training> trainings) {
        this.trainings = trainings;
    }
}

package com.isg.ws.Employee.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isg.ws.Employee.Employee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class EmployeeDto {
    @NotBlank
    private String adSoyad;

    @NotBlank
    private String tcKimlik;

    @NotBlank
    private String departman;

    @NotBlank
    private String pozisyon;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate iseGirisTarihi;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate saglikRaporTarihi;

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

    public Employee toEntity() {
        Employee employee = new Employee();
        employee.setAdSoyad(this.adSoyad);
        employee.setTcKimlik(this.tcKimlik);
        employee.setDepartman(this.departman);
        employee.setPozisyon(this.pozisyon);
        employee.setIseGirisTarihi(this.iseGirisTarihi);
        employee.setSaglikRaporTarihi(this.saglikRaporTarihi);
        return employee;
    }

    public void updateEntity(Employee employee) {
        employee.setAdSoyad(this.adSoyad);
        employee.setTcKimlik(this.tcKimlik);
        employee.setDepartman(this.departman);
        employee.setPozisyon(this.pozisyon);
        employee.setIseGirisTarihi(this.iseGirisTarihi);
        employee.setSaglikRaporTarihi(this.saglikRaporTarihi);
    }
}


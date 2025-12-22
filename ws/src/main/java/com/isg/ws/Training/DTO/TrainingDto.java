package com.isg.ws.Training.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isg.ws.Employee.Employee;
import com.isg.ws.Training.Training;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public class TrainingDto {
    @NotBlank
    private String egitimAdi;

    @NotBlank
    private String egitmen;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate tarih;

    @NotNull
    private boolean sertifikaVerildi;


    @Size(min = 1, message = "Katılımcı listesi boş olamaz")
    private List<Long> katilimciIds; // Employee ID'leri

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

    public List<Long> getKatilimciIds() {
        return katilimciIds;
    }

    public void setKatilimciIds(List<Long> katilimciIds) {
        this.katilimciIds = katilimciIds;
    }

    public Training toEntity(List<Employee> katilimcilar) {
        Training training = new Training();
        training.setEgitimAdi(this.egitimAdi);
        training.setEgitmen(this.egitmen);
        training.setTarih(this.tarih);
        training.setSertifikaVerildi(this.sertifikaVerildi);
        training.setKatilimcilar(katilimcilar);
        return training;
    }

    public void updateEntity(Training training, List<Employee> katilimcilar) {
        training.setEgitimAdi(this.egitimAdi);
        training.setEgitmen(this.egitmen);
        training.setTarih(this.tarih);
        training.setSertifikaVerildi(this.sertifikaVerildi);
        training.setKatilimcilar(katilimcilar);
    }
}

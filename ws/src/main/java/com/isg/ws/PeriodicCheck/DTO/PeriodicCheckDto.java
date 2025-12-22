package com.isg.ws.PeriodicCheck.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.isg.ws.PeriodicCheck.PeriodicCheck;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class PeriodicCheckDto {
    @NotBlank
    private String ekipmanAdi;

    @NotBlank
    private String kategori;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate sonKontrolTarihi;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birSonrakiKontrolTarihi;

    @NotBlank
    private String durum;

    public String getEkipmanAdi() {
        return ekipmanAdi;
    }

    public void setEkipmanAdi(String ekipmanAdi) {
        this.ekipmanAdi = ekipmanAdi;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public LocalDate getSonKontrolTarihi() {
        return sonKontrolTarihi;
    }

    public void setSonKontrolTarihi(LocalDate sonKontrolTarihi) {
        this.sonKontrolTarihi = sonKontrolTarihi;
    }

    public LocalDate getBirSonrakiKontrolTarihi() {
        return birSonrakiKontrolTarihi;
    }

    public void setBirSonrakiKontrolTarihi(LocalDate birSonrakiKontrolTarihi) {
        this.birSonrakiKontrolTarihi = birSonrakiKontrolTarihi;
    }

    public String getDurum() {
        return durum;
    }

    public void setDurum(String durum) {
        this.durum = durum;
    }

    public PeriodicCheck toEntity() {
        PeriodicCheck periodicCheck = new PeriodicCheck();
        periodicCheck.setEkipmanAdi(this.ekipmanAdi);
        periodicCheck.setKategori(this.kategori);
        periodicCheck.setSonKontrolTarihi(this.sonKontrolTarihi);
        periodicCheck.setBirSonrakiKontrolTarihi(this.birSonrakiKontrolTarihi);
        periodicCheck.setDurum(this.durum);
        return periodicCheck;
    }

    public void updateEntity(PeriodicCheck periodicCheck) {
        periodicCheck.setEkipmanAdi(this.ekipmanAdi);
        periodicCheck.setKategori(this.kategori);
        periodicCheck.setSonKontrolTarihi(this.sonKontrolTarihi);
        periodicCheck.setBirSonrakiKontrolTarihi(this.birSonrakiKontrolTarihi);
        periodicCheck.setDurum(this.durum);
    }
}


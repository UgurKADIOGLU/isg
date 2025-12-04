package com.isg.ws.PeriodicCheck;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

public class PeriodicCheck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ekipmanAdi;

    private String kategori; // örn: Basınçlı kap, kaldırma aracı

    private LocalDate sonKontrolTarihi;

    private LocalDate birSonrakiKontrolTarihi;

    private String durum;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}

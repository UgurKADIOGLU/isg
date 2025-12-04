package com.isg.ws.RiskAssessment;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class RiskAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tehlikeTanimi;

    private int olasilik;  // 1–5
    private int siddet;    // 1–5
    private int riskSkoru; // otomatik hesaplanabilir

    private String mevcutOnlemler;

    private String ilaveOnlemler;

    private String sorumluKisi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTehlikeTanimi() {
        return tehlikeTanimi;
    }

    public void setTehlikeTanimi(String tehlikeTanimi) {
        this.tehlikeTanimi = tehlikeTanimi;
    }

    public int getOlasilik() {
        return olasilik;
    }

    public void setOlasilik(int olasilik) {
        this.olasilik = olasilik;
    }

    public int getSiddet() {
        return siddet;
    }

    public void setSiddet(int siddet) {
        this.siddet = siddet;
    }

    public int getRiskSkoru() {
        return riskSkoru;
    }

    public void setRiskSkoru(int riskSkoru) {
        this.riskSkoru = riskSkoru;
    }

    public String getMevcutOnlemler() {
        return mevcutOnlemler;
    }

    public void setMevcutOnlemler(String mevcutOnlemler) {
        this.mevcutOnlemler = mevcutOnlemler;
    }

    public String getIlaveOnlemler() {
        return ilaveOnlemler;
    }

    public void setIlaveOnlemler(String ilaveOnlemler) {
        this.ilaveOnlemler = ilaveOnlemler;
    }

    public String getSorumluKisi() {
        return sorumluKisi;
    }

    public void setSorumluKisi(String sorumluKisi) {
        this.sorumluKisi = sorumluKisi;
    }
}

package com.isg.ws.RiskAssessment.DTO;

import com.isg.ws.RiskAssessment.RiskAssessment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RiskAssessmentDto {
    @NotBlank
    private String tehlikeTanimi;

    @NotNull
    private int olasilik;

    @NotNull
    private int siddet;

    @NotNull
    private int riskSkoru;

    @NotBlank
    private String mevcutOnlemler;

    @NotBlank
    private String ilaveOnlemler;

    @NotBlank
    private String sorumluKisi;

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

    public RiskAssessment toEntity() {
        RiskAssessment riskAssessment = new RiskAssessment();
        riskAssessment.setTehlikeTanimi(this.tehlikeTanimi);
        riskAssessment.setOlasilik(this.olasilik);
        riskAssessment.setSiddet(this.siddet);
        riskAssessment.setRiskSkoru(this.riskSkoru);
        riskAssessment.setMevcutOnlemler(this.mevcutOnlemler);
        riskAssessment.setIlaveOnlemler(this.ilaveOnlemler);
        riskAssessment.setSorumluKisi(this.sorumluKisi);
        return riskAssessment;
    }

    public void updateEntity(RiskAssessment riskAssessment) {
        riskAssessment.setTehlikeTanimi(this.tehlikeTanimi);
        riskAssessment.setOlasilik(this.olasilik);
        riskAssessment.setSiddet(this.siddet);
        riskAssessment.setRiskSkoru(this.riskSkoru);
        riskAssessment.setMevcutOnlemler(this.mevcutOnlemler);
        riskAssessment.setIlaveOnlemler(this.ilaveOnlemler);
        riskAssessment.setSorumluKisi(this.sorumluKisi);
    }
}

package com.isg.ws.Accident.DTO;

import java.time.LocalDate;

public class AccidentDto {
    private LocalDate tarih;
    private String aciklama;
    private String fotoUrl;
    private String kokNedenAnalizi;
    private Long employeeId;

    public LocalDate getTarih() { return tarih; }
    public void setTarih(LocalDate tarih) { this.tarih = tarih; }

    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }

    public String getKokNedenAnalizi() { return kokNedenAnalizi; }
    public void setKokNedenAnalizi(String kokNedenAnalizi) { this.kokNedenAnalizi = kokNedenAnalizi; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
}

package com.isg.ws.Accident.DTO;



import com.isg.ws.Accident.Accident;
import com.isg.ws.Employee.Employee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Optional;

public class AccidentDto {
    @NotNull(message = "Tarih boş olamaz")
    private LocalDate tarih;

    @NotBlank(message = "Açıklama boş olamaz")
    private String aciklama;

    @NotBlank(message = "Fotoğraf URL boş olamaz")
    private String fotoUrl;

    @NotBlank(message = "Kök neden analizi boş olamaz")
    private String kokNedenAnalizi;

    @NotNull(message = "Çalışan ID boş olamaz")
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

    public Accident toEntity(Employee employee) {
        Accident a = new Accident();
        a.setTarih(this.tarih);
        a.setAciklama(this.aciklama);
        a.setFotoUrl(this.fotoUrl);
        a.setKokNedenAnalizi(this.kokNedenAnalizi);
        a.setEmployee(employee);
        return a;
    }

    public void updateEntity(Accident a, Employee employee) {
        a.setTarih(this.tarih);
        a.setAciklama(this.aciklama);
        a.setFotoUrl(this.fotoUrl);
        a.setKokNedenAnalizi(this.kokNedenAnalizi);
        a.setEmployee(employee);
    }
}


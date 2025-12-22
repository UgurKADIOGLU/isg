package com.isg.ws.Document.DTO;
import com.isg.ws.Document.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DocumentDto {
    @NotBlank
    private String ad;

    @NotBlank
    private String tur;

    @NotBlank
    private String dosyaYolu;

    @NotBlank
    private String aciklama;

    public String getAd() { return ad; }
    public void setAd(String ad) { this.ad = ad; }

    public String getTur() { return tur; }
    public void setTur(String tur) { this.tur = tur; }

    public String getDosyaYolu() { return dosyaYolu; }
    public void setDosyaYolu(String dosyaYolu) { this.dosyaYolu = dosyaYolu; }

    public String getAciklama() { return aciklama; }
    public void setAciklama(String aciklama) { this.aciklama = aciklama; }

    public Document toEntity() {
        Document d = new Document();
        d.setAd(this.ad);
        d.setTur(this.tur);
        d.setDosyaYolu(this.dosyaYolu);
        d.setAciklama(this.aciklama);
        return d;
    }

    public void updateEntity(Document d) {
        d.setAd(this.ad);
        d.setTur(this.tur);
        d.setDosyaYolu(this.dosyaYolu);
        d.setAciklama(this.aciklama);
    }
}


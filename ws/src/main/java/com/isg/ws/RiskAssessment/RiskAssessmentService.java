package com.isg.ws.RiskAssessment;

import com.isg.ws.RiskAssessment.DTO.RiskAssessmentDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RiskAssessmentService {

    private final RiskAssessmentRepository riskAssessmentRepository;

    public RiskAssessmentService(RiskAssessmentRepository riskAssessmentRepository) {
        this.riskAssessmentRepository = riskAssessmentRepository;
    }

    public RiskAssessment create(RiskAssessmentDto dto) {
        // Risk skorunu otomatik hesapla
        RiskAssessment riskAssessment = dto.toEntity();
        if (riskAssessment.getRiskSkoru() == 0) {
            riskAssessment.setRiskSkoru(dto.getOlasilik() * dto.getSiddet());
        }
        return riskAssessmentRepository.save(riskAssessment);
    }

    public Optional<RiskAssessment> update(Long id, RiskAssessmentDto dto) {
        return riskAssessmentRepository.findById(id)
                .map(existing -> {
                    dto.updateEntity(existing);
                    // Risk skorunu otomatik hesapla
                    if (existing.getRiskSkoru() == 0) {
                        existing.setRiskSkoru(dto.getOlasilik() * dto.getSiddet());
                    }
                    return riskAssessmentRepository.save(existing);
                });
    }

    public List<RiskAssessment> findAll() {
        return riskAssessmentRepository.findAll();
    }

    public Optional<RiskAssessment> findById(Long id) {
        return riskAssessmentRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (riskAssessmentRepository.existsById(id)) {
            riskAssessmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


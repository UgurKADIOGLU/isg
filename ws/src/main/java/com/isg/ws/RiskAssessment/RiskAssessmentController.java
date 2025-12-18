package com.isg.ws.RiskAssessment;

import com.isg.ws.RiskAssessment.DTO.RiskAssessmentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risk-assessments")
public class RiskAssessmentController {

    private final RiskAssessmentService riskAssessmentService;

    public RiskAssessmentController(RiskAssessmentService riskAssessmentService) {
        this.riskAssessmentService = riskAssessmentService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<RiskAssessment> create(@RequestBody RiskAssessmentDto dto) {
        return ResponseEntity.ok(riskAssessmentService.create(dto));
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<RiskAssessment> update(@PathVariable Long id, @RequestBody RiskAssessmentDto dto) {
        return riskAssessmentService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<RiskAssessment>> list() {
        return ResponseEntity.ok(riskAssessmentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RiskAssessment> get(@PathVariable Long id) {
        return riskAssessmentService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (riskAssessmentService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}


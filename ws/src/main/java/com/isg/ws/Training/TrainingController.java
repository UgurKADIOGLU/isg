package com.isg.ws.Training;

import com.isg.ws.Training.DTO.TrainingDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
public class TrainingController {

    private final TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Training> create(@RequestBody TrainingDto dto) {
        return trainingService.create(dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Training> update(@PathVariable Long id, @RequestBody TrainingDto dto) {
        return trainingService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Training>> list() {
        return ResponseEntity.ok(trainingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Training> get(@PathVariable Long id) {
        return trainingService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (trainingService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}


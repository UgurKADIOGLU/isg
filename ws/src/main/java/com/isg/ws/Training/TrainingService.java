package com.isg.ws.Training;

import com.isg.ws.Employee.Employee;
import com.isg.ws.Employee.EmployeeRepository;
import com.isg.ws.Training.DTO.TrainingDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingService {

    private final TrainingRepository trainingRepository;
    private final EmployeeRepository employeeRepository;

    public TrainingService(TrainingRepository trainingRepository, EmployeeRepository employeeRepository) {
        this.trainingRepository = trainingRepository;
        this.employeeRepository = employeeRepository;
    }

    public Optional<Training> create(TrainingDto dto) {
        List<Employee> katilimcilar = new ArrayList<>();

        if (dto.getKatilimciIds() != null && !dto.getKatilimciIds().isEmpty()) {
            katilimcilar = employeeRepository.findAllById(dto.getKatilimciIds());

            // Tüm ID'ler bulunmalı
            if (katilimcilar.size() != dto.getKatilimciIds().size()) {
                return Optional.empty();
            }
        }

        Training training = trainingRepository.save(dto.toEntity(katilimcilar));
        return Optional.of(training);
    }

    public Optional<Training> update(Long id, TrainingDto dto) {
        return trainingRepository.findById(id)
                .flatMap(existing -> {
                    List<Employee> katilimcilar = new ArrayList<>();

                    if (dto.getKatilimciIds() != null && !dto.getKatilimciIds().isEmpty()) {
                        katilimcilar = employeeRepository.findAllById(dto.getKatilimciIds());

                        // Tüm ID'ler bulunmalı
                        if (katilimcilar.size() != dto.getKatilimciIds().size()) {
                            return Optional.empty();
                        }
                    }

                    dto.updateEntity(existing, katilimcilar);
                    return Optional.of(trainingRepository.save(existing));
                });
    }

    public List<Training> findAll() {
        return trainingRepository.findAll();
    }

    public Optional<Training> findById(Long id) {
        return trainingRepository.findById(id);
    }

    public boolean delete(Long id) {
        if (trainingRepository.existsById(id)) {
            trainingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

